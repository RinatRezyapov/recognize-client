import { fromNullable, Option } from 'fp-ts/lib/Option';
import config from '../config';
import ProtocolCommand from './protocol/ProtocolCommand';
import { handleApiResponse } from './other/handleApiResponse';

const ConnectionStatus = {
  Connected: 'Connected',
  NotConnected: 'NotConnected',
  Reconnecting: 'Reconnecting',
  Sending: 'Sending',
  ReconnectionTimeout: 'ReconnectionTimeout',
}

type Resolve = (command: ProtocolCommand) => void;
type Reject = (e: Error) => void;
type ProtocolCommandWithCallback = [ProtocolCommand, Resolve, Reject];

export class WebSocketConnection {
  public onOpen: () => void;
  public onClose: (event: any) => void;
  public onMessage: (event: any) => void;
  public onError: (error: any) => void;

  connection: Option<WebSocket>;
  status: string;
  store: any;
  queue: [ProtocolCommandWithCallback] = [] as any;
  promises: { [id: string]: ProtocolCommandWithCallback } = {};
  timeoutId: Option<any>;

  connect() {
    const connection = new WebSocket(config.production.apiEndPointWs);

    connection.onopen = () => {
      this.status = ConnectionStatus.Connected;
      console.log(this.status);
      fromNullable(this.onOpen)
        .map(v => v());
      this.processQueue();
    }

    connection.onmessage = (event) => {
      if (typeof event.data === 'string') {
        const response = JSON.parse(event.data);
        switch (response.tpe.value) {
          case 'ServerMessage.ServerResponse':
            this.promises[response.msgId][1](response.data);
            delete this.promises[response.msgId];
            this.processQueue();
            break;
          default:
            throw new Error(`Undefined server response ${response}`);
        }
      } else {
        console.log('Error parsing data', event.data)
      }
      fromNullable(this.onMessage)
        .map(v => v(event));
    }

    connection.onclose = (event) => {
      if (this.status === ConnectionStatus.ReconnectionTimeout) { return }
      this.status = ConnectionStatus.NotConnected;
      console.log(this.status);
      fromNullable(this.onClose)
        .map(v => v(event));
      this.startReconnectionTimeout();
    }

    connection.onerror = (error) => {
      if (this.status === ConnectionStatus.ReconnectionTimeout) { return }
      this.status = ConnectionStatus.NotConnected;
      console.log(this.status, error);
      fromNullable(this.onError)
        .map(v => v(error));
      this.startReconnectionTimeout();
    }

    this.connection = fromNullable(connection)
  }

  processQueue() {
    if (this.status !== ConnectionStatus.Connected) { return }
    fromNullable(this.queue.shift())
      .map(body =>
        this.connection.map(connection => {
          this.status = ConnectionStatus.Sending;
          connection.send(JSON.stringify(body[0].construct()));
          this.promises[body[0].id] = body;
          this.status = ConnectionStatus.Connected;
        }),
      )
  }

  addToQueue(command: ProtocolCommand, res: Resolve, rej: Reject) {
    this.queue.push([command, res, rej]);
    if (this.status !== ConnectionStatus.Connected) { return }
    this.processQueue();
  }

  send<R>(command: ProtocolCommand): Promise<R> {
    return handleApiResponse<R>(new Promise((res, rej) => this.addToQueue(command, res, rej)));
  }

  sendFine(file: Blob) {
    this.connection.map(connection => {
      connection.binaryType = 'arraybuffer';
      connection.send(new Blob([file, 'test']))
    })
  }

  reconnect() {
    this.status = ConnectionStatus.Reconnecting;
    this.closeConnection();
    this.connect();
  }

  startReconnectionTimeout() {
    this.status = ConnectionStatus.ReconnectionTimeout;
    this.timeoutId = fromNullable(setTimeout(() => this.reconnect(), 500));
  }

  closeConnection() {
    this.status = ConnectionStatus.NotConnected;
    this.connection.map(connection => connection.close())
  }

  setStore(store: any) {
    this.store = store;
  }
}

export default new WebSocketConnection();

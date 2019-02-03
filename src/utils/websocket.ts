import ws from '../api/ws';

export const initializeWebSocket = (store: any) => {
  ws.setStore(store);
  ws.connect();
}

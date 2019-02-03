import ProtocolCommand from './ProtocolCommand';

export class Send extends ProtocolCommand {
  constructor(file: ArrayBuffer) {
    super('Files', 'Send', { file })
  }
}

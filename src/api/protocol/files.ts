import ProtocolCommand from './ProtocolCommand';

export class Send extends ProtocolCommand {
  constructor(file: string) {
    super('Files', 'Send', { file })
  }
}

import ProtocolObject from './ProtocolObject';
import TypeId from './TypeId';

export default class File extends ProtocolObject {
  static $Type = new TypeId<File>({ value: 'File' });
  name: string;

  constructor({
    name,
  } : {
    name: string,
  }) {
    super({ tpe: File.$Type });
    this.name = name;
  }
}


import ProtocolObject from './ProtocolObject';
import TypeId from './TypeId';

export default class Id<T> extends ProtocolObject {
  static $Type = new TypeId<Id<any>>({value: 'Id'});

  value: string;

  constructor({ value }: { value: string }) {
    super({ tpe: Id.$Type });

    this.value = value;
  }
}

import ProtocolObject from './ProtocolObject';
import TypeId from './TypeId';
import Id from './Id';

export default class ME<T> extends ProtocolObject {
  static $Type = new TypeId<ME<any>>({value: 'ME'});

  id: Id<T>;
  entity: T;

  constructor({ id, entity }: { id: Id<T>, entity: T }) {
    super({ tpe: ME.$Type });
    this.id = id;
    this.entity = entity;
  }
}

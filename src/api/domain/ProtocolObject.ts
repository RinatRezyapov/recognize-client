import TypeId from './TypeId';

export default class ProtocolObject {
  tpe: TypeId<any>;
  constructor({ tpe }: { tpe: TypeId<any> }) {
    this.tpe = tpe;
  }
}

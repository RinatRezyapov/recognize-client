import ProtocolObject from './ProtocolObject';
import TypeId from './TypeId';
import { Expression } from './Expression';

export default class SearchQuery extends ProtocolObject {
  static $Type = new TypeId<SearchQuery>({ value: 'SearchQuery' });

  entity: string;
  field: string;
  expression: Expression;
  value: string;

  constructor({
    entity,
    field,
    expression,
    value,
  } : {
    entity: string,
    field: string,
    expression: Expression,
    value: string,
  }) {
      super({ tpe: SearchQuery.$Type });

      this.entity = entity;
      this.field = field;
      this.expression = expression;
      this.value = value;
  }
}

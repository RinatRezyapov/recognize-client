import ProtocolObject from './ProtocolObject';
import TypeId from './TypeId';

export abstract class Expression extends ProtocolObject {
  constructor({ tpe } : { tpe: TypeId<Expression> }) {
      super({ tpe })
  }
}

export class ExpressionEq extends Expression {
  static $Type = new TypeId<ExpressionEq>({ value: 'ExpressionEq' });

  constructor() {
      super({ tpe: ExpressionEq.$Type });
  }
}

export class ExpressionContains extends Expression {
  static $Type = new TypeId<ExpressionContains>({ value: 'ExpressionContains' });

  constructor() {
      super({ tpe: ExpressionContains.$Type });
  }
}

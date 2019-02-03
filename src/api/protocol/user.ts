import ProtocolCommand from './ProtocolCommand';
import { User, ME, Id } from '../entities';

export class Request extends ProtocolCommand {
  constructor(userId: Id<User>) {
    super('User', 'Request', { userId })
  }
}

export class List extends ProtocolCommand {
  constructor() {
    super('User', 'List');
  }
}

export class ListById extends ProtocolCommand {
    constructor(userIds: Array<Id<User>>) {
      super('User', 'ListById', { userIds });
    }
}

export class Update extends ProtocolCommand {
  constructor(userMe: ME<User>) {
    super('User', 'Update', { userMe })
  }
}

export class Create extends ProtocolCommand {
  constructor(user: User) {
    super('User', 'Create', { user })
  }
}

export class Delete extends ProtocolCommand {
  constructor(id: Id<User>) {
    super('User', 'Delete', { userId: id })
  }
}

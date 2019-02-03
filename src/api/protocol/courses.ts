import ProtocolCommand from './ProtocolCommand';
import { Course, ME, Id, User } from '../entities';

export class List extends ProtocolCommand {
  constructor(userId: Id<User>) {
    super('Courses', 'List', { userId })
  }
}

export class Update extends ProtocolCommand {
  constructor(courseMe: ME<Course>) {
    super('Courses', 'Update', { courseMe })
  }
}

export class Create extends ProtocolCommand {
  constructor(course: Course) {
    super('Courses', 'Create', { course })
  }
}

export class Delete extends ProtocolCommand {
  constructor(id: Id<Course>) {
    super('Courses', 'Delete', { courseId: id })
  }
}

export class Request extends ProtocolCommand {
  constructor(courseId: Id<Course>) {
    super('Courses', 'Request', { courseId })
  }
}

export class ListAll extends ProtocolCommand {
  constructor() {
    super('Courses', 'ListAll', {})
  }
}

export class ListIds extends ProtocolCommand {
  constructor(courseIds: Array<Id<Course>>) {
    super('Courses', 'ListIds', { courseIds })
  }
}

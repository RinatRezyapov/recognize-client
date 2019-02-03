import ProtocolObject from './ProtocolObject';
import TypeId from './TypeId';
import { Option } from 'fp-ts/lib/Option';
import Id from './Id';
import Course from './Course';

export default class User extends ProtocolObject {
  static $Type = new TypeId<User>({ value: 'User' });
  name: string;
  email: string;
  avatar: Option<Id<File>>;
  joinedDate: Option<number>;
  courses: Array<Id<Course>>;
  followers: Array<Id<User>>;
  following: Array<Id<User>>;

  constructor({
    name,
    email,
    avatar,
    joinedDate,
    courses,
    followers,
    following,
  } : {
    name: string,
    email: string,
    avatar: Option<Id<File>>,
    joinedDate: Option<number>,
    courses: Array<Id<Course>>,
    followers: Array<Id<User>>,
    following: Array<Id<User>>,
  }) {
    super({ tpe: User.$Type });
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    this.joinedDate = joinedDate;
    this.courses = courses;
    this.followers = followers;
    this.following = following;
  }
}

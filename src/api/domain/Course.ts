import ProtocolObject from './ProtocolObject';
import TypeId from './TypeId';
import { User, Id } from '../entities';
import { Option } from 'fp-ts/lib/Option';

export default class Course extends ProtocolObject {
  static $Type = new TypeId<Course>({ value: 'Course' });
  name: Option<string>;
  data: Option<string>;
  owner: Id<User>;
  picture: Option<Id<File>>;
  description: Option<string>;
  shortDescription: Option<string>;
  tags: Option<string>;
  createdDate: Option<number>;
  modifiedDate: Option<number>;
  language: Option<string>;
  enrolled: Array<Id<User>>;
  likes: Array<Id<User>>;

  constructor({
    name,
    data,
    owner,
    picture,
    description,
    shortDescription,
    tags,
    createdDate,
    modifiedDate,
    language,
    enrolled,
    likes,
  }: {
    name: Option<string>;
    data: Option<string>;
    owner: Id<User>;
    picture: Option<Id<File>>;
    description: Option<string>;
    shortDescription: Option<string>;
    tags: Option<string>;
    createdDate: Option<number>;
    modifiedDate: Option<number>;
    language: Option<string>;
    enrolled: Array<Id<User>>;
    likes: Array<Id<User>>;
  }) {
    super({ tpe: Course.$Type });
    this.name = name;
    this.data = data;
    this.owner = owner;
    this.picture = picture;
    this.description = description;
    this.shortDescription = shortDescription;
    this.tags = tags;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
    this.language = language;
    this.enrolled = enrolled;
    this.likes = likes;
  }
}

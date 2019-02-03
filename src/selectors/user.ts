import { IApplicationState } from '../reducers';
import { fromNullable, Option } from 'fp-ts/lib/Option';
import { ME, User } from '../api/entities';

export const getUserOpt = (state: IApplicationState): Option<ME<User>> => {
  const userIdOpt = state.auth.userId;

  return userIdOpt.chain(userId => fromNullable(state.users.data.filter(user => user.id.value === userId.value)[0]));
}

export const getUserName = (state: IApplicationState) => {
  const userOpt = getUserOpt(state);

  return userOpt.map(user => user.entity.name);
}

export const getUserAvatar = (state: IApplicationState) => {
  const userOpt = getUserOpt(state);

  return userOpt.chain(v => v.entity.avatar);
}

export const getUserEmail = (state: IApplicationState) => {
  const userOpt = getUserOpt(state);

  return userOpt.map(v => v.entity.email);
}

export const getUserCourses = (state: IApplicationState) => {
  const userOpt = getUserOpt(state);

  return userOpt.map(user => user.entity.courses).getOrElse([]);
}

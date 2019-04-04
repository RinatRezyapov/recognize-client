import { Option } from 'fp-ts/lib/Option';

import { ME, User } from '../api/entities';
import { getUserId } from './auth';
import { IApplicationState } from '../reducers';
import { headOption } from '../utils/fp-ts';

export const getUsersData = (state: IApplicationState) => state.users.data;

export const getUsersFetching = (state: IApplicationState) => state.users.fetching;

export const getUserOpt = (state: IApplicationState): Option<ME<User>> => {
  return getUserId(state).chain(userId =>
    headOption(getUsersData(state).filter(user => user.id.value === userId.value))
  );
};

export const getUserName = (state: IApplicationState) => getUserOpt(state).map(user => user.entity.name);

export const getUserAvatar = (state: IApplicationState) => getUserOpt(state).chain(v => v.entity.avatar);

export const getUserEmail = (state: IApplicationState) => getUserOpt(state).map(v => v.entity.email);

export const getUserCoursesIds = (state: IApplicationState) => getUserOpt(state).map(user =>
  user.entity.courses
).getOrElse([]);

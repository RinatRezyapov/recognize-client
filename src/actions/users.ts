import { createAction } from 'redux-actions';
import { Id, ME, User } from '../api/entities';

export const USERS_FETCHING = 'Users.Fetching';
export const usersFetching = createAction(USERS_FETCHING);

export const USERS_RESOLVED = 'Users.Fetched';
export interface IUsersResolvedPayload {
  result: Array<ME<User>>;
};
export const usersResolved = createAction<IUsersResolvedPayload, IUsersResolvedPayload>(
    USERS_RESOLVED,
  (p: IUsersResolvedPayload) => p,
);

export const USERS_ERROR = 'Users.Error';
export interface IUsersErrorPayload {
  error: Error;
};
export const usersError = createAction<IUsersErrorPayload, IUsersErrorPayload>(
    USERS_ERROR,
  (p: IUsersErrorPayload) => p,
);

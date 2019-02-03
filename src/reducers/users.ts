import { fromNullable, Option, none } from 'fp-ts/lib/Option'
import update from 'immutability-helper';
import { handleActions, Action } from 'redux-actions';
import { ME, User } from '../api/entities';
import {
  USERS_RESOLVED,
  USERS_ERROR,
  USERS_FETCHING,
  IUsersErrorPayload,
  IUsersResolvedPayload,
} from '../actions/users';

export interface IState {
  fetching: boolean;
  data: Array<ME<User>>;
  error: Option<Error>;
}

const initialState: IState = {
  fetching: false,
  data: [],
  error: none,
}

export default handleActions<IState, any>({
  [USERS_FETCHING]: (state: IState, action: Action<void>): IState =>
    update(state, {
      fetching: {
        $set: true,
      },
    }) as IState,
  [USERS_RESOLVED]: (state: IState, action: Action<IUsersResolvedPayload>): IState =>
    fromNullable(action.payload)
      .map(payload =>
        update(state, {
          fetching: {
            $set: false,
          },
          data: {
            $set: payload.result,
          },
        }) as IState,
      )
      .getOrElse(state),
  [USERS_ERROR]: (state: IState, action: Action<IUsersErrorPayload>): IState =>
    fromNullable(action.payload)
      .map(payload =>
        update(state, {
          fetching: {
            $set: false,
          },
          error: {
            $set: fromNullable(payload.error),
          },
        }) as IState,
      )
      .getOrElse(state),
}, initialState);

import { Option, some, none, fromNullable } from 'fp-ts/lib/Option'
import update from 'immutability-helper';

import { handleActions, Action } from 'redux-actions';
import { setToken, removeToken } from '../store/sessionStorage';
import { SET_TOKEN, SIGN_IN, SIGN_OUT } from '../actions/auth';
import { User, Id } from '../api/entities';
import { parseJwt } from '../utils/jwt';

export interface IState {
  token: Option<string>;
  userId: Option<Id<User>>;
}

const initialState: IState = {
  token: none,
  userId: none,
}

export default handleActions<IState, any>({
  [SET_TOKEN]: (state: IState, action: Action<string>): IState =>
    fromNullable(action.payload)
      .map(payload =>
        update(state, {
          token: {
            $set: fromNullable(payload),
          },
          userId: {
            $set: fromNullable<Id<User>>(new Id<User>({ value: parseJwt(payload).id })),
          },
        }) as IState,
      )
      .getOrElse(state),
  [SIGN_IN]: (state: IState, action: Action<string>): IState =>
    fromNullable(action.payload)
      .map(payload => {

        setToken(payload);

        return update(state, {
          token: {
            $set: some(payload),
          },
          userId: {
            $set: fromNullable<Id<User>>(new Id<User>({ value: parseJwt(payload).id })),
          },
        }) as IState
      })
      .getOrElse(state),
  [SIGN_OUT]: (state: IState, action: Action<void>): IState => {

    removeToken();

    return update(state, {
      token: {
        $set: none,
      },
      userId: {
        $set: none,
      },
    }) as IState
  },
}, initialState);

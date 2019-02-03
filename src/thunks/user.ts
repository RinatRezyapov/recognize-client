import { Dispatch } from 'redux';
import { fromNullable } from 'fp-ts/lib/Option';
import to from 'await-to-js';
import update from 'immutability-helper';

import { User, Id, ME } from '../api/entities';
import * as ProtocolUser from '../api/protocol/User';
import ws from '../api/ws';
import { usersFetching, usersResolved, usersError } from '../actions/users';
import { IApplicationState } from '../reducers';
import { getUserOpt } from '../selectors/user';

export const fetchUser = (userId: Id<User>) => async (dispatch: Dispatch) => {
  dispatch(usersFetching());
  const [optionalError, optionalResult] = await to(ws.send<ME<User>>(new ProtocolUser.Request(userId)));

  fromNullable(optionalResult)
    .map(result => dispatch(usersResolved({ result: [result] })))
  fromNullable(optionalError)
    .map(error => dispatch(usersError({ error })))
}

export const fetchUsers = () => async (dispatch: Dispatch) => {
  dispatch(usersFetching());
  const [optionalError, optionalResult] = await to(ws.send<Array<ME<User>>>(new ProtocolUser.List()));

  fromNullable(optionalResult)
    .map(result => dispatch(usersResolved({ result })))
  fromNullable(optionalError)
    .map(error => dispatch(usersError({ error })))
}

export const fetchUsersById = (userIds: Array<Id<User>>) => async (dispatch: Dispatch) => {
    dispatch(usersFetching());
    const [optionalError, optionalResult] = await to(ws.send<Array<ME<User>>>(new ProtocolUser.ListById(userIds)));

    fromNullable(optionalResult)
      .map(result => dispatch(usersResolved({ result })))
    fromNullable(optionalError)
      .map(error => dispatch(usersError({ error })))
  }

export const updateUser = (userId: Id<User>, data: {[key: string]: any}) =>
  async (dispatch: Dispatch, getState: () => IApplicationState) => {
    const state = getState();
    getUserOpt(state)
      .map(async user => {
        const result = update(user, {
          entity: {
            $merge: data,
          },
        })
        dispatch(usersResolved({ result: [result] }))
        const [optionalError] = await to(ws.send<ME<User>>(new ProtocolUser.Update(result)));
        fromNullable(optionalError)
          .map(error => dispatch(usersError({ error })))
      })
  }

/*export const createUser = (user: User) =>
  async (dispatch: Dispatch, getState: () => IApplicationState) => {
    const state = getState();
    const [optionalError, optionalResult] = await to(ws.send<ME<User>>(new ProtocolUsers.Create(user)));
    fromNullable(optionalResult)
      .map(resultUser => {
        const UserData = fromNullable(state.user.data[userId.value])
          .getOrElse([])
        const result = update(UserData, {
          $push: [resultUser],
        })
        dispatch(userResolved({ userId, result }))
      })
    fromNullable(optionalError)
      .map(error => dispatch(userError({ userId, error })))
  }*/

/*export const deleteUser = (userId: Id<User>, courseId: Id<User>) =>
  async (dispatch: Dispatch, getState: () => IApplicationState) => {
    const state = getState();
    const [optionalError, optionalResult] = await to(ws.send<Id<User>>(new ProtocolUsers.Delete(courseId)));
    fromNullable(optionalResult)
      .map(resutUserId => {
        const result = fromNullable(state.user.data[userId.value])
          .getOrElse([])
          .filter(user => user.id.value !== resutUserId.value)
        dispatch(userResolved({ userId, result }));
      })
    fromNullable(optionalError)
      .map(error => dispatch(userError({ userId, error })))
  }*/

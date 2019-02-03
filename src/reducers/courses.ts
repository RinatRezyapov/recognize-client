import { fromNullable, Option, none } from 'fp-ts/lib/Option'
import update from 'immutability-helper';
import { handleActions, Action } from 'redux-actions';
import { COURSES_RESOLVED, ICoursesResolvedPayload, COURSES_FETCHING, ICoursesErrorPayload, COURSES_ERROR } from '../actions/courses';
import { Course, ME } from '../api/entities';

export interface IState {
  fetching: boolean;
  data: Array<ME<Course>>;
  error: Option<Error>;
}

const initialState: IState = {
  fetching: false,
  data: [],
  error: none,
}

export default handleActions<IState, any>({
  [COURSES_FETCHING]: (state: IState, action: Action<void>): IState =>
    update(state, {
      fetching: {
        $set: true,
      },
    }) as IState,
  [COURSES_RESOLVED]: (state: IState, action: Action<ICoursesResolvedPayload>): IState =>
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
  [COURSES_ERROR]: (state: IState, action: Action<ICoursesErrorPayload>): IState =>
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

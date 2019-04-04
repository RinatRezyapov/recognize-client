import { Dispatch } from 'redux';
import { fromNullable, Option, Some } from 'fp-ts/lib/Option';
import to from 'await-to-js';
import update from 'immutability-helper';

import { User, Id, ME, Course } from '../api/entities';
import { coursesFetching, coursesResolved, coursesError } from '../actions/courses';
import * as ProtocolCourses from '../api/protocol/courses';
import ws from '../api/ws';
import { IApplicationState } from '../reducers';
import { getCourseOpt } from '../selectors/course';
import { fetchUsersById } from './user';
import { usersResolved } from '../actions/users';
import { headOption } from '../utils/fp-ts';

export const fetchCoursesByUserId = (userId: Id<User>) => async (dispatch: Dispatch) => {
  dispatch(coursesFetching());
  const [optionalError, optionalResult] = await to(ws.send<Array<ME<Course>>>(new ProtocolCourses.List(userId)));
  fromNullable(optionalResult)
    .map(result => dispatch(coursesResolved({ result })))
  fromNullable(optionalError)
    .map(error => dispatch(coursesError({ error })))
}

export const fetchCoursesByIds = (courseIds: Array<Id<Course>>) => async (dispatch: Dispatch) => {
  dispatch(coursesFetching());
  const [optionalError, optionalResult] = await to(ws.send<Array<ME<Course>>>(new ProtocolCourses.ListIds(courseIds)));
  fromNullable(optionalResult)
    .map(result => dispatch(coursesResolved({ result })))
  fromNullable(optionalError)
    .map(error => dispatch(coursesError({ error })))
}

export const fetchCourses = () => async (dispatch: Dispatch) => {
  dispatch(coursesFetching());
  const [optionalError, optionalResult] = await to(ws.send<Array<ME<Course>>>(new ProtocolCourses.ListAll()));
  fromNullable(optionalResult)
    .map(result => {
      dispatch(coursesResolved({ result }))
      dispatch(fetchUsersById(result.map(v => v.entity.owner)) as any)
    })
  fromNullable(optionalError)
    .map(error => dispatch(coursesError({ error })))
}

export const fetchCourse = (courseId: Id<Course>) => async (dispatch: Dispatch) => {
  dispatch(coursesFetching());
  const [optionalError, optionalResult] = await to(ws.send<Array<ME<Course>>>(new ProtocolCourses.Request(courseId)));
  fromNullable(optionalResult)
    .map(result => dispatch(coursesResolved({ result })))
  fromNullable(optionalError)
    .map(error => dispatch(coursesError({ error })))
}

export const createCourse = (course: Course) =>
  async (dispatch: Dispatch, getState: () => IApplicationState) => {
    const state = getState();
    const userId = course.owner;
    const user = headOption(state.users.data.filter(userVal => userVal.id.value === userId.value));
    const [optionalError, optionalResult] = await to(ws.send<ME<Course>>(new ProtocolCourses.Create(course)));
    fromNullable(optionalResult).map(resultCourse => {
      const coursesData = state.courses.data.filter(v => v.entity.owner.value === userId.value);
      const result = update(coursesData, {
        $push: [resultCourse],
      })
      dispatch(coursesResolved({ result }));
      user.map((userVal) => {
        const newUser = update(userVal, {
          entity: {
            courses: {
              $push: [resultCourse.id]
            }
          }
        })
        dispatch(usersResolved({ result: [newUser] }));
      })
    })
    fromNullable(optionalError).map(error => dispatch(coursesError({ error })))
  }

export const updateCourse = (courseId: Id<Course>, data: { [key: string]: any }) =>
  async (dispatch: Dispatch, getState: () => IApplicationState) => {
    const state = getState();

    getCourseOpt(courseId, state)
      .map(async course => {
        const previousCourses = state.courses.data;
        const updatedCourse = update(course, {
          entity: {
            $merge: data,
          },
        })
        const idx = state.courses.data.findIndex(el => el.id.value === course.id.value);
        const result = update(state.courses.data, {
          $splice: [[idx, 1, updatedCourse]],
        })
        dispatch(coursesResolved({ result }));

        const [optionalError] = await to(ws.send<ME<Course>>(new ProtocolCourses.Update(updatedCourse)));

        fromNullable(optionalError)
          .map(error => {
            dispatch(coursesError({ error }));
            dispatch(coursesResolved({ result: previousCourses }));
          })
      })
  }

export const deleteCourse = (userId: Id<User>, courseId: Id<Course>) =>
  async (dispatch: Dispatch, getState: () => IApplicationState) => {
    const state = getState();
    const previousUserCourses = state.courses.data.filter(v => v.entity.owner.value === userId.value);
    const result = previousUserCourses.filter(course => course.id.value !== courseId.value);
    dispatch(coursesResolved({ result }));

    const [optionalError] = await to(ws.send<Id<Course>>(new ProtocolCourses.Delete(courseId)));

    fromNullable(optionalError)
      .map(error => {
        dispatch(coursesError({ error }));
        dispatch(coursesResolved({ result: previousUserCourses }));
      })
  }

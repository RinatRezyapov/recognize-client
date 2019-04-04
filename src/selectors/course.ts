import { Option, fromNullable } from 'fp-ts/lib/Option';
import { matchPath } from 'react-router-dom';

import { ME, Course, Id } from '../api/entities';
import { IApplicationState } from '../reducers';
import { createSelector } from 'reselect';
import { getUserId } from './auth';
import { headOption } from '../utils/fp-ts';

export const getCourseOpt = (courseId: Id<Course>, state: IApplicationState): Option<ME<Course>> => {
  return headOption(state.courses.data.filter(course => course.id.value === courseId.value));
}

export const getCoursesFetching = (state: IApplicationState) => state.courses.fetching;
export const getCoursesData = (state: IApplicationState) => state.courses.data;

const getCourseId = (state: IApplicationState) => {
  const match = matchPath(state.router.location.pathname, { path: '/course/:id' });

  return fromNullable(match).map(match => (match.params as {id: string}).id);
}

export const getCourse = createSelector(
  getUserId,
  getCoursesData,
  getCourseId,
  (userId, coursesData, courseId) => {
    return courseId.chain(courseId =>
      headOption(
        userId.map(userId => coursesData.filter(courseMe => courseMe.entity.owner.value === userId.value))
        .getOrElse([])
        .filter(v => v.id.value === courseId)
      )
    )
  }
)

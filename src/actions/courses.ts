import { createAction } from 'redux-actions';
import { User, Id, Course, ME } from '../api/entities';
import { Option } from 'fp-ts/lib/Option';

export const COURSES_FETCHING = 'Courses.Fetching';
export const coursesFetching = createAction(COURSES_FETCHING);

export const COURSES_RESOLVED = 'Courses.Fetched';
export interface ICoursesResolvedPayload {
  result: Array<ME<Course>>;
};
export const coursesResolved = createAction<ICoursesResolvedPayload, ICoursesResolvedPayload>(
  COURSES_RESOLVED,
  (p: ICoursesResolvedPayload) => p,
);

export const COURSES_ERROR = 'Courses.Error';
export interface ICoursesErrorPayload {
  error: Error;
};
export const coursesError = createAction<ICoursesErrorPayload, ICoursesErrorPayload>(
  COURSES_ERROR,
  (p: ICoursesErrorPayload) => p,
);

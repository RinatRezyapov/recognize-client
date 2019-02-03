import { IApplicationState } from '../reducers';
import { Option, fromNullable } from 'fp-ts/lib/Option';
import { ME, Course, Id } from '../api/entities';

export const getCourseOpt = (courseId: Id<Course>, state: IApplicationState): Option<ME<Course>> => {
  console.log(state.courses.data, courseId)

  return fromNullable(state.courses.data.filter(course => course.id.value === courseId.value)[0])
}

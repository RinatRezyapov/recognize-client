import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';

import { Option } from 'fp-ts/lib/Option';
import { Course, ME, User, Id, SearchQuery } from '../api/entities';
import { IApplicationState } from '../reducers';
import { createCourse, deleteCourse, updateCourse, fetchCourses } from '../thunks/courses';
import { getUserId } from '../selectors/auth';
import { fetchUser } from '../thunks/user';
import Courses from '../components/Courses';
import { searchThunk } from '../thunks/search';
import { getCoursesFetching, getCoursesData } from '../selectors/course';
import { getUsersData } from '../selectors/user';
import { getRouterLocation } from '../selectors/router';

interface IStateProps {
  userIdOpt: Option<Id<User>>;
  courses: Array<ME<Course>>;
  users: Array<ME<User>>;
  coursesFetching: boolean;
}

interface IDispatchProps {
  fetchUser(userId: Id<User>): void;
  fetchCourses(): void;
  createCourse(course: Course): void;
  deleteCourse(userId: Id<User>, courseId: Id<Course>): void;
  updateCourse(courseId: Id<Course>, data: { [key: string]: any }): void;
  searchThunk(query: SearchQuery): void;
}

interface IBoundProps {
  history: History;
}

type IProps = IStateProps & IDispatchProps & IBoundProps;

const CoursesContainer: React.FunctionComponent<IProps> = (props) => {

  useEffect(() => {
    props.userIdOpt.map(userId => props.fetchCourses());
  }, []);

  return <Courses {...props} />
};

export default connect<IStateProps, IDispatchProps, IBoundProps, IApplicationState>(
  (state) => ({
    location: getRouterLocation(state),
    courses: getCoursesData(state),
    users: getUsersData(state),
    userIdOpt: getUserId(state),
    coursesFetching: getCoursesFetching(state),
  }),
  ({
    fetchUser,
    fetchCourses,
    createCourse,
    deleteCourse,
    updateCourse,
    searchThunk,
  }),
)(CoursesContainer)

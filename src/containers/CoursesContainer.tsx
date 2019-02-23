import * as React from 'react';
import { connect } from 'react-redux';
import { Option } from 'fp-ts/lib/Option';
import { Course, ME, User, Id, SearchQuery } from '../api/entities';
import { IApplicationState } from '../reducers';
import { createCourse, deleteCourse, updateCourse, fetchCourses } from '../thunks/courses';
import { getUserId } from '../selectors/auth';
import { useEffect } from 'react';
import { fetchUser } from '../thunks/user';
import Courses from '../components/Courses';
import { searchThunk } from '../thunks/search';

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
  history: any;
}

type IProps = IStateProps & IDispatchProps & IBoundProps;

const CoursesContainer: React.FunctionComponent<IProps> = (props: IProps) => {

  useEffect(() => {
    props.userIdOpt.map(userId => props.fetchCourses());
  }, []);

  return <Courses {...props} />
};

export default connect<IStateProps, IDispatchProps, IBoundProps, IApplicationState>(
  (state) => ({
    location: state.router.location,
    courses: state.courses.data,
    users: state.users.data,
    userIdOpt: getUserId(state),
    coursesFetching: state.courses.fetching,
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

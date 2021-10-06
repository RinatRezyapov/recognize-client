import * as React from 'react';
import { connect } from 'react-redux';
import { Option } from 'fp-ts/lib/Option';
import { History } from 'history';

import CircularProgress from '@mui/material/CircularProgress';

import { Course, ME, User, Id } from '../api/entities';
import Profile from '../components/Profile';
import { IApplicationState } from '../reducers';
import { fetchCoursesByUserId, createCourse, deleteCourse, updateCourse, fetchCoursesByIds } from '../thunks/courses';
import { getUserName, getUserAvatar, getUserCoursesIds, getUsersFetching } from '../selectors/user';
import { getUserId } from '../selectors/auth';
import { useEffect } from 'react';
import { fetchUser, updateUser } from '../thunks/user';
import { getRouterLocation } from '../selectors/router';
import { getCoursesData } from '../selectors/course';

interface IStateProps {
  userIdOpt: Option<Id<User>>;
  userNameOpt: Option<string>;
  userAvatarOpt: Option<Id<File>>;
  courses: Array<ME<Course>>;
  userCourses: Array<Id<Course>>;
  usersFetching: boolean;
}

interface IDispatchProps {
  fetchUser(userId: Id<User>): void;
  fetchCoursesByUserId(userId: Id<User>): void;
  fetchCoursesByIds(courseIds: Array<Id<Course>>): void;
  createCourse(course: Course): void;
  deleteCourse(userId: Id<User>, courseId: Id<Course>): void;
  updateCourse(courseId: Id<Course>, data: { [key: string]: any }): void;
  updateUser(data: { [key: string]: any }): void;
}

interface IBoundProps {
  history: History;
}

type IProps = IStateProps & IDispatchProps & IBoundProps;

const ProfileContainer: React.FunctionComponent<IProps> = (props) => {

  useEffect(() => {
    props.userIdOpt.map(userId => props.fetchUser(userId));
  }, []);

  if (props.usersFetching) {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return <Profile {...props} />
};

export default connect<IStateProps, IDispatchProps, IBoundProps, IApplicationState>(
  (state) => ({
    location: getRouterLocation(state),
    courses: getCoursesData(state),
    userCourses: getUserCoursesIds(state),
    userNameOpt: getUserName(state),
    userAvatarOpt: getUserAvatar(state),
    userIdOpt: getUserId(state),
    usersFetching: getUsersFetching(state),
  }),
  ({
    fetchUser,
    fetchCoursesByUserId,
    fetchCoursesByIds,
    createCourse,
    deleteCourse,
    updateCourse,
    updateUser,
  }),
)(ProfileContainer)

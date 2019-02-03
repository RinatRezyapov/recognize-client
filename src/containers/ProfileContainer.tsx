import * as React from 'react';
import { connect } from 'react-redux';
import { fromNullable, Option } from 'fp-ts/lib/Option';

import CircularProgress from '@material-ui/core/CircularProgress';

import { Course, ME, User, Id } from '../api/entities';
import Profile from '../components/Profile';
import { IState as IAuthState } from '../reducers/auth';
import { IApplicationState } from '../reducers';
import { fetchCoursesByUserId, createCourse, deleteCourse, updateCourse, fetchCoursesByIds } from '../thunks/courses';
import { getUserName, getUserAvatar, getUserCourses } from '../selectors/user';
import { getUserId } from '../selectors/auth';
import { useEffect } from 'react';
import { fetchUser, updateUser } from '../thunks/user';
import Grid from '@material-ui/core/Grid';
import { uploadCourseFile } from '../thunks/files';

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
  updateUser(userId: Id<User>, data: {[key: string]: any}): void;
  uploadCourseFile(courseId: Id<Course>, file: ArrayBuffer): void;
}

interface IBoundProps {
  history: any;
}

type IProps = IStateProps & IDispatchProps & IBoundProps;

const ProfileContainer: React.FunctionComponent<IProps> = (props: IProps) => {

  useEffect(() => {
    props.userIdOpt.map(userId => props.fetchUser(userId));
  }, []);

  if (props.usersFetching) {
    return (
      <Grid
        container={true}
        alignItems='center'
        justify='center'
        style={{ flex: 1 }}
      >
        <CircularProgress />
      </Grid>
    )
  }

  return <Profile {...props} />
};

export default connect<IStateProps, IDispatchProps, IBoundProps, IApplicationState>(
  (state) => ({
    location: state.router.location,
    courses: state.courses.data,
    userCourses: getUserCourses(state),
    userNameOpt: getUserName(state),
    userAvatarOpt: getUserAvatar(state),
    userIdOpt: getUserId(state),
    usersFetching: state.users.fetching,
  }),
  ({
    fetchUser,
    fetchCoursesByUserId,
    fetchCoursesByIds,
    createCourse,
    deleteCourse,
    updateCourse,
    updateUser,
    uploadCourseFile,
  }),
)(ProfileContainer)

import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { isSome, Option } from 'fp-ts/lib/Option';

import { IState as IAuthState } from '../reducers/auth';
import { IApplicationState } from '../reducers';
import AppHeader from '../components/AppHeader';
import FabComponent from '../components/FabComponent';
import { getUserName, getUserAvatar, getUserEmail } from '../selectors/user';
import { getUserId } from '../selectors/auth';
import { User, Id, Course, ME } from '../api/entities';
import { fetchUser, updateUser } from '../thunks/user';
import { userSignOut } from '../thunks/auth';
import { createCourse } from '../thunks/courses';
import Grid from '@material-ui/core/Grid';
import { uploadCourseFile } from '../thunks/files';

interface IStateProps {
  auth: IAuthState;
  userIdOpt: Option<Id<User>>;
  userNameOpt: Option<string>;
  userAvatarOpt: Option<Id<File>>;
  userEmailOpt: Option<string>;
  hideAppHeader: boolean;
  hideFabButton: boolean;
}

interface IDispatchProps {
  fetchUser(userId: Id<User>): void;
  createCourse(course: Course): void;
  userSignOut(): void;
  uploadCourseFile(courseId: Id<Course>, file: ArrayBuffer): void;
}

interface IBoundProps {
  component: any,
  path: string,
  history: any;
}

type IProps = IStateProps & IDispatchProps & IBoundProps

const PrivateRoute: React.FunctionComponent<IProps> = ({ component, history, ...rest }: IProps) => {
  const Component = component;

  const renderAppHeader = () =>
    isSome(rest.auth.token) &&
    (
      <AppHeader
        history={history}
        userNameOpt={rest.userNameOpt}
        userAvatarOpt={rest.userAvatarOpt}
        userEmailOpt={rest.userEmailOpt}
        userSignOut={rest.userSignOut}
      />
    )

  const renderFabComponent = () =>
    isSome(rest.auth.token) &&
    (
      <FabComponent
        history={history}
        userIdOpt={rest.userIdOpt}
        createCourse={rest.createCourse}
        uploadCourseFile={rest.uploadCourseFile}
      />
    )

  return (
    <Route
      {...rest}
      render={props =>
        isSome(rest.auth.token) ? (
          <Grid container={true} spacing={0} direction='column' style={{ flex: 1 }}>
            {!rest.hideAppHeader && renderAppHeader()}
            <Component {...props} />
            {!rest.hideFabButton && renderFabComponent()}
          </Grid>
        ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          )
      }
    />
  );
}

export default connect<IStateProps, IDispatchProps, IBoundProps, IApplicationState>(
  (state) => ({
    auth: state.auth,
    userNameOpt: getUserName(state),
    userAvatarOpt: getUserAvatar(state),
    userEmailOpt: getUserEmail(state),
    userIdOpt: getUserId(state),
    hideAppHeader: state.ui.hideAppHeader,
    hideFabButton: state.ui.hideFabButton,
  }),
  ({
    fetchUser,
    userSignOut,
    createCourse,
    uploadCourseFile,
  }),
)(PrivateRoute)

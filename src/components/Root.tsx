import * as React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { isSome, Option } from 'fp-ts/lib/Option';

import { User, Id, Course } from '../api/entities';

import SignInContainer from '../containers/SignInContainer';
import SignUpContainer from '../containers/SignUpContainer';
import ProfileContainer from '../containers/ProfileContainer';
import PrivateRoute from '../containers/PrivateRoute';
import CourseViewerContainer from '../containers/CourseViewerContainer';
import CoursesContainer from '../containers/CoursesContainer';
import UsersContainer from '../containers/UsersContainer';
import AppHeader from './AppHeader';
import FabComponent from './FabComponent';

import { getUserName, getUserAvatar, getUserEmail } from '../selectors/user';
import { getUserId } from '../selectors/auth';
import { fetchUser } from '../thunks/user';
import { userSignOut } from '../thunks/auth';
import { createCourse } from '../thunks/courses';

import { IApplicationState } from '../reducers';
import { IState as IAuthState } from '../reducers/auth';

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
}

interface IBoundProps {
  history: any;
}

type IProps = IStateProps & IDispatchProps & IBoundProps
const Root = (props: IProps) => {
  const renderAppHeader = () => (!props.hideAppHeader && isSome(props.auth.token)) &&
    <AppHeader
      history={history}
      userNameOpt={props.userNameOpt}
      userAvatarOpt={props.userAvatarOpt}
      userEmailOpt={props.userEmailOpt}
      userSignOut={props.userSignOut}
    />


  const renderFabComponent = () => (!props.hideAppHeader && isSome(props.auth.token)) &&
    <FabComponent
      history={history}
      userIdOpt={props.userIdOpt}
      createCourse={props.createCourse}
    />

  return <>
    {renderAppHeader()}
    {renderFabComponent()}
    <Route exact={true} path={'/'} component={SignInContainer} />
    <Route exact={true} path={'/signup'} component={SignUpContainer} />
    <PrivateRoute path={'/profile'} component={ProfileContainer} history={props.history} />
    <PrivateRoute path={'/course/:courseId'} component={CourseViewerContainer} history={props.history} />
    <PrivateRoute path={'/courses'} component={CoursesContainer} history={props.history} />
    <PrivateRoute path={'/users'} component={UsersContainer} history={props.history} />
  </>

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
  }),
)(Root)


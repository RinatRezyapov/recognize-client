import * as React from 'react';
import { Route } from 'react-router-dom';
import { isSome, Option } from 'fp-ts/lib/Option';
import { History } from 'history';

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
import SnackbarComponent from './SnackbarComponent';
import { ISnackbarVisibilityPayload } from '../actions/ui';

interface IProps {
  history: History;
  token: Option<string>;
  userIdOpt: Option<Id<User>>;
  userNameOpt: Option<string>;
  userAvatarOpt: Option<Id<File>>;
  userEmailOpt: Option<string>;
  isAppHeaderVisible: boolean;
  isFabButtonVisible: boolean;
  isSnackbarVisible: boolean;
  snackbarMessage: Option<string>;
  createCourse(course: Course): void;
  userSignOut(): void;
  changeSnackbarVisibility(snackbarProps: ISnackbarVisibilityPayload): void;
}

const Root: React.FunctionComponent<IProps> = ({
  history,
  token,
  isFabButtonVisible,
  isAppHeaderVisible,
  userNameOpt,
  userAvatarOpt,
  userEmailOpt,
  userIdOpt,
  isSnackbarVisible,
  snackbarMessage,
  userSignOut,
  createCourse,
  changeSnackbarVisibility,
}) => {

  const renderAppHeader = () => (isFabButtonVisible && isSome(token)) &&
    (
      <AppHeader
        history={history}
        userNameOpt={userNameOpt}
        userAvatarOpt={userAvatarOpt}
        userEmailOpt={userEmailOpt}
        userSignOut={userSignOut}
      />
    )

  const renderFabComponent = () => (isAppHeaderVisible && isSome(token)) &&
    (
      <FabComponent
        userIdOpt={userIdOpt}
        createCourse={createCourse}
      />
    )

  const renderSnackbarComponent = () => (
    <SnackbarComponent
      isSnackbarVisible={isSnackbarVisible}
      changeSnackbarVisibility={changeSnackbarVisibility}
      snackbarMessage={snackbarMessage}
    />
  )

  return (
    <>
      {renderAppHeader()}
      {renderFabComponent()}
      {renderSnackbarComponent()}
      <Route exact={true} path={'/'} component={SignInContainer} />
      <Route exact={true} path={'/signup'} component={SignUpContainer} />
      <PrivateRoute path={'/profile'} component={ProfileContainer} history={history} />
      <PrivateRoute path={'/course/:courseId'} component={CourseViewerContainer} history={history} />
      <PrivateRoute path={'/courses'} component={CoursesContainer} history={history} />
      <PrivateRoute path={'/users'} component={UsersContainer} history={history} />
    </>
  )
}

export default Root;

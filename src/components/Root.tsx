import * as React from 'react';
import { Route } from 'react-router-dom';

import SignInContainer from '../containers/SignInContainer';
import SignUpContainer from '../containers/SignUpContainer';

import ProfileContainer from '../containers/ProfileContainer';
import PrivateRoute from '../containers/PrivateRoute';
import CourseViewerContainer from '../containers/CourseViewerContainer';
import CoursesContainer from '../containers/CoursesContainer';
import UsersContainer from '../containers/UsersContainer';

interface IProps {
  history: any;
}

const Root = (props: IProps) =>
  (
    <>
      <Route exact={true} path={'/'} component={SignInContainer} />
      <Route exact={true} path={'/signup'} component={SignUpContainer} />
      <PrivateRoute path={'/profile'} component={ProfileContainer} history={props.history} />
      <PrivateRoute path={'/course/:courseId'} component={CourseViewerContainer} history={props.history} />
      <PrivateRoute path={'/courses'} component={CoursesContainer} history={props.history} />
      <PrivateRoute path={'/users'} component={UsersContainer} history={props.history} />
    </>
  )

export default Root;

import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import SignIn from '../components/SignIn';

import { userSignIn } from '../thunks/auth';

import { IApplicationState } from '../reducers';
import { IState as AuthState } from '../reducers/auth';

interface IProps {
  location: string;
  dispatch: Dispatch;
  auth: AuthState;
  userSignIn: (login: string, password: string) => void;
}

const SignInContainer = (props: IProps) => <SignIn {...props} />;

const mapStateToProps = (state: IApplicationState) => ({
  location: state.router.location,
  auth: state.auth,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch,
  userSignIn,
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer)

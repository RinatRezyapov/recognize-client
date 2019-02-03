import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import SignUp from '../components/SignUp';

import { IApplicationState } from '../reducers';
import { IState as AuthState } from '../reducers/auth';

import { userSignUp } from '../thunks/auth';

interface IProps {
  location: string;
  dispatch: any;
  auth: AuthState;
  userSignUp: (login: string, password: string, name: string) => void;
}

const SignUpContainer = (props: IProps) => <SignUp {...props} />;

const mapStateToProps = (state: IApplicationState) => ({
  location: state.router.location,
  auth: state.auth,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch,
  userSignUp,
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer)

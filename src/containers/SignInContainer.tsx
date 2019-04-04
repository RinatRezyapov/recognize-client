import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import SignIn from '../components/SignIn';

import { userSignIn } from '../thunks/auth';

import { IApplicationState } from '../reducers';
import { getRouterLocation } from '../selectors/router';
import { getToken } from '../selectors/auth';
import { Option } from 'fp-ts/lib/Option';

interface IStateProps {
  token: Option<string>;
}

interface IDispatchProps {
  userSignIn: (login: string, password: string) => void;
}

interface IBoundProps {
  history: History;
}

type IProps = IStateProps & IDispatchProps & IBoundProps;

const SignInContainer: React.FunctionComponent<IProps> = (props) => <SignIn {...props} />;

export default connect<IStateProps, IDispatchProps, IBoundProps, IApplicationState>(
  (state) => ({
    token: getToken(state),
  }),
  ({
    userSignIn,
  }),
)(SignInContainer)

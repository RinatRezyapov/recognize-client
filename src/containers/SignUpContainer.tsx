import * as React from 'react';
import { connect } from 'react-redux';
import { Option } from 'fp-ts/lib/Option';

import SignUp from '../components/SignUp';

import { IApplicationState } from '../reducers';
import { getToken } from '../selectors/auth';
import { userSignUp } from '../thunks/auth';

interface IStateProps {
  token: Option<string>;
}

interface IDispatchProps {
  userSignUp: (login: string, password: string, name: string) => void;
}

interface IBoundProps {
  history: History;
}

type IProps = IStateProps & IDispatchProps & IBoundProps;

const SignUpContainer: React.FunctionComponent<IProps> = (props) => <SignUp {...props} />;

export default connect<IStateProps, IDispatchProps, IBoundProps, IApplicationState>(
  (state) => ({
    token: getToken(state),
  }),
  ({
    userSignUp,
  }),
)(SignUpContainer)

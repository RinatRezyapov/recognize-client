import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { isSome } from 'fp-ts/lib/Option';

import Paper from '@material-ui/core/Paper/Paper';

import SignUpForm from '../forms/SignUpForm';

import { IState as AuthState } from '../reducers/auth';

interface IProps {
  location: string;
  dispatch: any;
  auth: AuthState;
  userSignUp: (login: string, password: string, name: string) => void;
}

const SignUp = (props: IProps) => {

  const handleOnClick = (values: any) => {
    props.dispatch(props.userSignUp(values.login, values.password, values.name))
  }

  if (isSome(props.auth.token)) {
    return <Redirect to='/profile' />
  }

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isSome(props.auth.token) ? 'flex-start' : 'center',
        alignItems: 'center'
      }}
    >
      <Paper style={{ width: '300px', padding: '30px' }}>
        <SignUpForm onSubmit={handleOnClick} />
      </Paper>
    </div>
  );
}

export default SignUp;

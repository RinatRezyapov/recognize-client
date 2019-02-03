import * as React from 'react';
import { Redirect } from 'react-router-dom';

import Paper from '@material-ui/core/Paper/Paper';

import SignUpForm from '../forms/SignUpForm';

import { IState as AuthState } from '../reducers/auth';
import { isSome } from 'fp-ts/lib/Option';
import Grid from '@material-ui/core/Grid';

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
    <Grid
      container={true}
      direction='column'
      alignItems='center'
      justify={isSome(props.auth.token) ? 'flex-start' : 'center'}
      style={{ flex: 1 }}
    >
      <Paper style={{ width: '300px', padding: '30px' }}>
        <SignUpForm onSubmit={handleOnClick} />
      </Paper>
    </Grid>
  );
}

export default SignUp;

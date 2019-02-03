import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { isSome } from 'fp-ts/lib/Option';

import Paper from '@material-ui/core/Paper/Paper';

import SignInForm from '../forms/SignInForm';

import { IState as AuthState } from '../reducers/auth';
import LanguageSelector from './LanguageSelector';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

interface IProps {
  location: string;
  dispatch: any;
  auth: AuthState;
  userSignIn: (login: string, password: string) => void;
}

const SignIn = (props: IProps) => {

  const handleOnClick = (values: any) => {
    props.dispatch(props.userSignIn(values.login, values.password))
  }

  if (isSome(props.auth.token)) {
    return <Redirect to='/profile' />
  }

  return (
    <Grid
      container={true}
      direction='column'
      alignItems='center'
      justify={'center'}
      style={{ flex: 1 }}
    >
      <Paper style={{ width: '300px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 5 }}><LanguageSelector /></div>
        <SignInForm onSubmit={handleOnClick} />
      </Paper>
      <Typography variant='body2' style={{ width: 500, marginTop: 50, textAlign: 'center' }}>
        This is a digital tachistoscope inspired by Samuel's Renshaw tachistoscopic training. 
        He believed that most people used only one-fifth of their available mind-power to process information. By using methods of flashing pages he produced students who could read upwards of 1,200 to 1,400 words per minute.
      </Typography>
    </Grid>
  );
}

export default SignIn;

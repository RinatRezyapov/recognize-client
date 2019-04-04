import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { isSome, Option } from 'fp-ts/lib/Option';

import Paper from '@material-ui/core/Paper/Paper';
import { Typography } from '@material-ui/core';

import SignInForm from '../../forms/SignInForm';
import LanguageSelector from '../LanguageSelector';

import './SignIn.scss';

interface IProps {
  token: Option<string>;
  userSignIn: (login: string, password: string) => void;
}

const SignIn: React.FunctionComponent<IProps> = ({
  token,
  userSignIn,
}) => {

  const handleOnClick = (values: any) => {
    userSignIn(values.login, values.password);
  }

  if (isSome(token)) {
    return <Redirect to='/profile' />
  }

  return (
    <div className='SignIn__container'>
      <Paper className='SignIn__paper'>
        <div className='SignIn__language-selector'>
          <LanguageSelector />
        </div>
        <SignInForm onSubmit={handleOnClick} />
      </Paper>
      <Typography variant='body2' className='SignIn__description'>
        This is a digital tachistoscope inspired by Samuel's Renshaw tachistoscopic training.
        He believed that most people used only one-fifth of their available mind-power to process information.
        By using methods of flashing pages he produced students who could read upwards of 1,200 to 1,400 words
        per minute.
      </Typography>
    </div>
  );
}

export default SignIn;

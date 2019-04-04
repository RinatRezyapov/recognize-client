import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { isSome, Option } from 'fp-ts/lib/Option';

import Paper from '@material-ui/core/Paper/Paper';

import SignUpForm from '../../forms/SignUpForm';

import './SignUp.scss';

interface IProps {
  token: Option<string>;
  userSignUp: (login: string, password: string, name: string) => void;
}

const SignUp: React.FunctionComponent<IProps> = ({
  token,
  userSignUp,
}) => {

  const handleOnClick = (values: any) => {
    userSignUp(values.login, values.password, values.name)
  }

  if (isSome(token)) {
    return <Redirect to='/profile' />
  }

  return (
    <div className='SignUp__container'>
      <Paper className='SignUp__paper'>
        <SignUpForm onSubmit={handleOnClick} />
      </Paper>
    </div>
  );
}

export default SignUp;

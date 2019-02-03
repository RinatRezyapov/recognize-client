import { createAction } from 'redux-actions';

export const SIGN_IN = 'User.Sign.In';
export const signIn = createAction<string, string>(
  SIGN_IN,
  (p: string) => p,
);

export const SIGN_OUT = 'User.Sign.Out';
export const signOut = createAction(SIGN_OUT);

export const SET_TOKEN = 'User.Set.Token';
export const setToken = createAction<string, string>(
  SET_TOKEN,
  (p: string) => p,
);

export const SIGN_IN_ERROR = 'User.Sign.In.Error';
export const signInError = createAction<Error, Error>(
  SIGN_IN_ERROR,
  (p: Error) => p,
);

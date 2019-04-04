import { IApplicationState } from '../reducers';

export const getUserId = (state: IApplicationState) => state.auth.userId;
export const getToken = (state: IApplicationState) => state.auth.token;
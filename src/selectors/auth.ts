import { IApplicationState } from '../reducers';

export const getUserId = (state: IApplicationState) => {
  return state.auth.userId;
}

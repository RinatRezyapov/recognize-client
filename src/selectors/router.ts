import { IApplicationState } from '../reducers';

export const getRouterLocation = (state: IApplicationState) => state.router.location;

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth, { IState as IAuthState } from './auth';
import courses, { IState as ICoursesState } from './courses';
import users, { IState as IUsersState } from './users';
import ui, { IState as IUIState } from './ui';
import { connectRouter } from 'connected-react-router';

interface IRouterState {
  location: string;
}

export interface IApplicationState {
  router: IRouterState,
  form: any,
  auth: IAuthState,
  courses: ICoursesState,
  users: IUsersState,
  ui: IUIState,
}

export default (history: any) => combineReducers({
  router: connectRouter(history),
  form: formReducer,
  auth,
  courses,
  users,
  ui,
})

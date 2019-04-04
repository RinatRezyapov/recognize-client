import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { History } from 'history';

import auth, { IState as IAuthState } from './auth';
import courses, { IState as ICoursesState } from './courses';
import users, { IState as IUsersState } from './users';
import ui, { IState as IUIState } from './ui';
import { connectRouter, RouterState } from 'connected-react-router';

export interface IApplicationState {
  router: RouterState,
  form: any,
  auth: IAuthState,
  courses: ICoursesState,
  users: IUsersState,
  ui: IUIState,
}

export default (history: History) => combineReducers({
  router: connectRouter(history),
  form: formReducer,
  auth,
  courses,
  users,
  ui,
})

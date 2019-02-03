import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from '../reducers/index';

export const history = createBrowserHistory();

export default function configureStore(preloadedState: any) {
  const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware,
      ),
    ),
  )

  if ((module as any).hot) {
    (module as any).hot.accept('../reducers', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store
}

import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore, { history } from './store/configureStore'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { DialogProvider } from './providers/DialogProvider';
import { setToken } from './actions/auth';
import { loadToken } from './store/sessionStorage';
import { initializeWebSocket } from './utils/websocket';
import App from './App';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#319197',
    },
    secondary: {
      main: '#af002d',
    },
  },
});

const store = configureStore({});

initializeWebSocket(store);

loadToken()
  .map(token => {
    store.dispatch(setToken(token));
  })

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <DialogProvider>
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <App history={history} />
          </Provider>
        </MuiThemeProvider>
      </DialogProvider>
    </AppContainer>,
    document.getElementById('root'),
  )
}

render()

if ((module as any).hot) {
  (module as any).hot.accept('./App', () => {
    render()
  })
}

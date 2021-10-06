import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore, { history } from './store/configureStore'
import { ThemeProvider, createTheme  } from '@mui/material/styles';
import { DialogProvider } from './providers/DialogProvider';
import { setToken } from './actions/auth';
import { loadToken } from './store/sessionStorage';
import { initializeWebSocket } from './utils/websocket';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d9138a',
    },
    secondary: {
      main: '#322e2f',
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
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <App history={history} />
          </Provider>
        </ThemeProvider>
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

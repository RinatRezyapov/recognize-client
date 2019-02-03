import * as React from 'react'
import { History } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { DialogProvider } from './providers/DialogProvider';
import Root from './components/Root';

interface IProps {
  history: History;
}

const theme = createMuiTheme();

const App = ({
  history,
}: IProps) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Root history={history} />
      </Switch>
    </ConnectedRouter>
  )
}

export default App

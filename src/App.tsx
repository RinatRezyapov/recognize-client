import * as React from 'react';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';
import RootContainer from './containers/RootContainer';

interface IProps {
  history: History;
}

const App: React.FunctionComponent<IProps> = ({
  history,
}) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <RootContainer history={history} />
      </Switch>
    </ConnectedRouter>
  )
}

export default App

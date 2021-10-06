import * as React from "react";
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";
import { Switch } from "react-router-dom";
import { StyledEngineProvider } from '@mui/material/styles';
import RootContainer from "./containers/RootContainer";

interface IProps {
  history: History;
}

const App: React.FunctionComponent<IProps> = ({
  history,
}) => {
  return (
    <StyledEngineProvider injectFirst>
      <ConnectedRouter history={history}>
        <Switch>
          <RootContainer history={history} />
        </Switch>
      </ConnectedRouter>
    </StyledEngineProvider>
  )
}

export default App;

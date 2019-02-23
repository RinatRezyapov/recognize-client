import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isSome } from 'fp-ts/lib/Option';

import { IState as IAuthState } from '../reducers/auth';
import { IApplicationState } from '../reducers';
import Grid from '@material-ui/core/Grid';

interface IStateProps {
  auth: IAuthState;
}

interface IDispatchProps {

}

interface IBoundProps {
  component: any,
  path: string,
  history: any;
}

type IProps = IStateProps & IDispatchProps & IBoundProps

const PrivateRoute: React.FunctionComponent<IProps> = ({ component, history, ...rest }: IProps) => {
  const Component = component;

  return (
    <Route
      {...rest}
      render={props =>
        isSome(rest.auth.token) ? (
            <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          )
      }
    />
  );
}

export default connect<IStateProps, IDispatchProps, IBoundProps, IApplicationState>(
  (state) => ({
    auth: state.auth,
  })
)(PrivateRoute)

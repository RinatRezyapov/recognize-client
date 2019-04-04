import * as React from 'react';
import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isSome, Option } from 'fp-ts/lib/Option';
import { History } from 'history';

import { changeAppHeaderVisibility, changeFabButtonVisibility } from '../actions/ui';
import { IApplicationState } from '../reducers';
import { getToken } from '../selectors/auth';

interface IStateProps {
  token: Option<string>;
}

interface IDispatchProps {
  changeAppHeaderVisibility(visible: boolean): void;
  changeFabButtonVisibility(visible: boolean): void;
}

interface IBoundProps {
  component: any,
  path: string,
  history: History;
}

type IProps = IStateProps & IDispatchProps & IBoundProps

const PrivateRoute: React.FunctionComponent<IProps> = ({
  component,
  history,
  ...rest
}) => {

  const Component = component;

  return (
    <Route
      {...rest}
      render={props =>
        isSome(rest.token) ? (
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
    token: getToken(state),
  }),
  ({
    changeAppHeaderVisibility,
    changeFabButtonVisibility,
  }),
)(PrivateRoute)

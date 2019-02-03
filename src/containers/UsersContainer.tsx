import * as React from 'react';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';

import { ME, User, Id } from '../api/entities';
import { IApplicationState } from '../reducers';
import { useEffect } from 'react';
import { fetchUsers } from '../thunks/user';
import Grid from '@material-ui/core/Grid';
import Users from '../components/Users';

interface IStateProps {
  users: Array<ME<User>>;
  usersFetching: boolean;
}

interface IDispatchProps {
  fetchUsers(): void;
}

interface IBoundProps {
  history: any;
}

type IProps = IStateProps & IDispatchProps & IBoundProps;

const UsersContainer: React.FunctionComponent<IProps> = (props: IProps) => {

  useEffect(() => {
    props.fetchUsers();
  }, []);

  if (props.usersFetching) {
    return (
      <Grid
        container={true}
        alignItems='center'
        justify='center'
        style={{ flex: 1 }}
      >
        <CircularProgress />
      </Grid>
    )
  }

  return <Users {...props} />
};

export default connect<IStateProps, IDispatchProps, IBoundProps, IApplicationState>(
  (state) => ({
    location: state.router.location,
    users: state.users.data,
    usersFetching: state.users.fetching,
  }),
  ({
    fetchUsers,
  }),
)(UsersContainer)

import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';

import CircularProgress from '@material-ui/core/CircularProgress';

import { ME, User } from '../api/entities';
import Users from '../components/Users';
import { IApplicationState } from '../reducers';
import { getUsersFetching, getUsersData } from '../selectors/user';
import { fetchUsers } from '../thunks/user';

interface IStateProps {
  users: Array<ME<User>>;
  usersFetching: boolean;
}

interface IDispatchProps {
  fetchUsers(): void;
}

interface IBoundProps {
  history: History;
}

type IProps = IStateProps & IDispatchProps & IBoundProps;

const UsersContainer: React.FunctionComponent<IProps> = (props) => {

  useEffect(() => {
    props.fetchUsers();
  }, []);

  if (props.usersFetching) {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return <Users {...props} />
};

export default connect<IStateProps, IDispatchProps, IBoundProps, IApplicationState>(
  (state) => ({
    users: getUsersData(state),
    usersFetching: getUsersFetching(state),
  }),
  ({
    fetchUsers,
  }),
)(UsersContainer)

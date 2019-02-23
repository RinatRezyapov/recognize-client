import * as React from 'react';

import Paper from '@material-ui/core/Paper/Paper';

import { ME, User } from '../api/entities';

import UserCard from './UserCard';

import { useI18n } from '../hooks/useI18n';

interface IProps {
  users: Array<ME<User>>;
}

const Users: React.FunctionComponent<IProps> = ({
  users,
}: IProps) => {

  const { t } = useI18n();

  return (
    <div style={{ display: 'flex', margin: '0px auto 0px auto', padding: '15px 0 0 0' }}>
      <div style={{ width: 250 }}>
        <Paper style={{ padding: '15px' }}>
          Filter
        </Paper>
      </div>
      <div style={{ width: 400, margin: '0px 10px' }}>
        {users
          .map((user, idx) =>

            <UserCard user={user} />

          )
        }
      </div>
    </div>
  );
}

export default Users;

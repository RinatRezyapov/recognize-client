import * as React from 'react';

import Paper from '@mui/material/Paper';

import { ME, User } from '../../api/entities';
import UserCard from '../UserCard';
import { useI18n } from '../../hooks/useI18n';

import './Users.scss';

interface IProps {
  users: Array<ME<User>>;
}

const Users: React.FunctionComponent<IProps> = ({
  users,
}) => {

  const { t } = useI18n();

  return (
    <div className='Users__container'>
      <Paper className='Users__left-panel' variant='outlined' elevation={0}>
        {t('Filter')}
      </Paper>
      <div className='Users__right-panel'>
        {users
          .map(user =>
            <UserCard key={user.id.value} user={user} />
          )
        }
      </div>
    </div>
  );
}

export default Users;

import * as React from 'react';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid';
import { ME, User, Id } from '../api/entities';
import { useI18n } from '../hooks/useI18n';
import UserCard from './UserCard';

interface IProps {
  users: Array<ME<User>>;
}

const Users: React.FunctionComponent<IProps> = ({
  users,
}: IProps) => {

  const { t } = useI18n();

  return (
    <Grid container={true} wrap='nowrap' justify='center' style={{ padding: '15px 0 0 0' }}>
      <Grid item={true} style={{ margin: '15px 0' }}>
        <Paper style={{ padding: '15px' }}>
          Filter
        </Paper>
      </Grid>
      <Grid container={true} direction='row' style={{ width: '960px'}}>
        {users
          .map((user, idx) =>
            <Grid key={idx} item={true} style={{ margin: '15px 10px' }}>
              <UserCard user={user} />
            </Grid>,
          )
        }
      </Grid>
    </Grid>
  );
}

export default Users;

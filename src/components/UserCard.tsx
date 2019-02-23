import * as React from 'react';
import { fromNullable, none } from 'fp-ts/lib/Option';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { ME, User } from '../api/entities';
import { styles } from './UserCardStyles';
import AvatarComponent from './AvatarComponent';

import { useMaterialPopover } from '../hooks/useMaterialPopover';
import { useMaterialDialog } from '../hooks/useMaterialDialog';

interface IProps {
  user: ME<User>;
  classes: any;
}

const UserCard = ({
  classes,
  user,
}: IProps) => {

  const { openPopover, closePopover, renderPopover } = useMaterialPopover();
  const { openDialog, closeDialog, renderDialog } = useMaterialDialog();
  const userNameOpt = fromNullable(user.entity.name);
  const userAvatarOpt = user.entity.avatar;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={require('../assets/defaultProfile.png')}
        title={'Name is undefined'}
      />
      <div style={{ position: 'absolute', top: 75, left: 10 }}>
        <AvatarComponent
          userAvatar={userAvatarOpt}
          userName={userNameOpt}
          size={'medium'}
          title={none}
          onClick={() => { return }}
        />
      </div>
      <CardHeader
        style={{ paddingTop: 50 }}
        action={
          <IconButton onClick={() => { return }}>
            <MoreVertIcon />
          </IconButton>}
        title={user.entity.name}
        subheader={`@${user.entity.name}`}
      />
      <CardContent>
        <Typography variant='subtitle2'>
          {'About me'}
        </Typography>
      </CardContent>
      {renderPopover()}
      {renderDialog()}
    </Card>
  );
}

export default withStyles(styles as any)(UserCard)

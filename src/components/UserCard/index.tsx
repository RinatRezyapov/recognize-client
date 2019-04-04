import * as React from 'react';
import { fromNullable, none } from 'fp-ts/lib/Option';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { ME, User } from '../../api/entities';
import AvatarComponent from '../AvatarComponent';

import { useMaterialPopover } from '../../hooks/useMaterialPopover';
import { useMaterialDialog } from '../../hooks/useMaterialDialog';

import './UserCard.scss';

interface IProps {
  user: ME<User>;
}

const UserCard: React.FunctionComponent<IProps> = ({
  user,
}) => {

  const { openPopover, closePopover, renderPopover } = useMaterialPopover();
  const { openDialog, closeDialog, renderDialog } = useMaterialDialog();
  const userNameOpt = fromNullable(user.entity.name);
  const userAvatarOpt = user.entity.avatar;

  return (
    <Card className='UserCard__card'>
      <CardMedia
        className='UserCard__media'
        image={require('../../assets/defaultProfile.png')}
      />
      <div className='UserCard__avatar-container'>
        <AvatarComponent
          userAvatar={userAvatarOpt}
          userName={userNameOpt}
          size={'medium'}
          title={none}
          onClick={() => { return }}
        />
      </div>
      <CardHeader
        className='UserCard__card-header'
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

export default UserCard

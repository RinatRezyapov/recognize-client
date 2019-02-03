import * as React from 'react';
import { useState } from 'react';
import classnames from 'classnames';
import { fromNullable, none, Option } from 'fp-ts/lib/Option';

import { withStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import { Course, ME, Id, User } from '../api/entities';
import { useMaterialPopover } from '../hooks/useMaterialPopover';
import { useI18n } from '../hooks/useI18n';
import { styles } from '../styles/UserCard';
import { useMaterialDialog } from '../hooks/useMaterialDialog';
import CourseCreateForm from '../forms/CourseCreateForm';
import update from 'immutability-helper';
import { Tooltip } from '@material-ui/core';
import AvatarComponent from './AvatarComponent';

interface IProps {
  user: ME<User>;
  classes: any;
}

const UserCard = ({
  classes,
  user,
}: IProps) => {

  const [expanded, setExpanded] = useState(false);
  const { openPopover, closePopover, renderPopover } = useMaterialPopover();
  const { openDialog, closeDialog, renderDialog } = useMaterialDialog();
  const userNameOpt = fromNullable(user.entity.name);
  const userAvatarOpt = user.entity.avatar;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={'https://static.memrise.com/uploads/course_photos/3146044000171229114509.png'}
        title={'Name is undefined'}
      />
      <div style={{ position: 'absolute', top: 75, left: 10 }}>
        <AvatarComponent
          userAvatar={userAvatarOpt}
          userName={userNameOpt}
          size={'medium'}
          tooltipTitle={none}
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

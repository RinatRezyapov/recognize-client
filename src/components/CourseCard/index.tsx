import * as React from 'react';
import { useState } from 'react';
import classnames from 'classnames';
import update from 'immutability-helper';
import { fromNullable, none, Option } from 'fp-ts/lib/Option';
import { History } from 'history';

import { withStyles, WithStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import { Course, ME, Id, User } from '../../api/entities';

import CourseCreateForm from '../../forms/CourseCreateForm';
import AvatarComponent from '../AvatarComponent';

import { useMaterialPopover } from '../../hooks/useMaterialPopover';
import { useI18n } from '../../hooks/useI18n';
import { useMaterialDialog } from '../../hooks/useMaterialDialog';

import { generateFileLink } from '../../utils/converters';
import { UNDEFINED_MESSAGE } from '../../utils/constants';

import './CourseCard.scss';

export const styles = (theme: Theme) => {
  return ({
    expand: {
      transform: 'rotate(0deg)',
      transition: theme?.transitions?.create('transform', {
        duration: theme?.transitions?.duration?.shortest,
      }),
      marginLeft: 'auto',
      [theme?.breakpoints?.up('sm')]: {
        marginRight: -8,
      },
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  })
}

interface IProps {
  course: ME<Course>;
  courseOwnerNameOpt: Option<string>;
  courseOwnerAvatarOpt: Option<Id<File>>;
  currentUserIdOpt: Option<Id<User>>;
  history: History;
  onCourseDelete: (courseId: Id<Course>) => void;
  updateCourse: (courseId: Id<Course>, data: { [key: string]: any }) => void;
}

const CourseCard: React.FunctionComponent<IProps & WithStyles<any>> = ({
  course,
  courseOwnerNameOpt,
  courseOwnerAvatarOpt,
  currentUserIdOpt,
  classes,
  onCourseDelete,
  updateCourse,
  history,
}) => {

  const [expanded, setExpanded] = useState(false);
  const { openPopover, closePopover, renderPopover } = useMaterialPopover();
  const { openDialog, closeDialog, renderDialog } = useMaterialDialog();
  const { t } = useI18n();
  const courseOwner = currentUserIdOpt.map(currentUserId => currentUserId.value === course.entity.owner.value)
    .getOrElse(false);
  const ceatedDate = new Date(course.entity.createdDate.getOrElse(new Date().getTime())).toLocaleDateString();
  const modifiedDate = new Date(course.entity.modifiedDate.getOrElse(new Date().getTime())).toLocaleDateString();

  const onExpandClick = () => {
    setExpanded(!expanded);
  };

  const onCourseDeleteClick = () => {
    closePopover();
    onCourseDelete(course.id);
  };

  const onCourseEditFormSubmit = (values: any, dialogId: string) => {
    updateCourse(
      course.id,
      update(course.entity, {
        $merge: {
          name: fromNullable(values.name),
          language: fromNullable(values.language),
          description: fromNullable(values.description),
          shortDescription: fromNullable(values.shortDescription),
          tags: fromNullable(values.tags),
          data: fromNullable(values.data),
          modifiedDate: fromNullable(new Date().getTime()),
          picture: values.picture,
        },
      }),
    )
    closeDialog(dialogId);
  }

  const onCourseEditClick = () => {
    closePopover();
    const dialogId = openDialog(
      t('Edit course'),
      (
        <CourseCreateForm
          onSubmit={(values: any) => onCourseEditFormSubmit(values, dialogId)}
          initialValues={{
            name: course.entity.name.getOrElse(''),
            language: course.entity.language.getOrElse(''),
            description: course.entity.description.getOrElse(''),
            shortDescription: course.entity.shortDescription.getOrElse(''),
            tags: course.entity.tags.getOrElse(''),
            data: course.entity.data.getOrElse(''),
            buttonLabel: t('Edit'),
            picture: course.entity.picture,
          }}
        />
      ),
      [],
    )
  };

  const onMoreClick = (e: any) => {
    openPopover(
      fromNullable(e.currentTarget),
      fromNullable(
        <List>
          {courseOwner && <ListItem button={true} onClick={onCourseEditClick}>
            <ListItemIcon><EditIcon /></ListItemIcon>
            <ListItemText primary={t('Edit')} />
          </ListItem>}
          {courseOwner && <ListItem button={true} onClick={onCourseDeleteClick}>
            <ListItemIcon><DeleteIcon /></ListItemIcon>
            <ListItemText primary={t('Delete')} />
          </ListItem>}
        </List>,
      ),
      none,
      none,
    )
  }

  const getUsersLikeIdx = () => {
    return currentUserIdOpt.map(currentUserId =>
      course.entity.likes.findIndex(el => el.value === currentUserId.value),
    ).getOrElse(-1)
  }

  const onLikeToogle = (e: any) => {
    currentUserIdOpt.map(currentUserId => {
      const idx = getUsersLikeIdx();
      if (idx !== -1) {
        return updateCourse(
          course.id,
          update(course.entity, {
            likes: {
              $splice: [[idx, 1]],
            },
          }),
        )
      }

      return updateCourse(
        course.id,
        update(course.entity, {
          likes: {
            $push: [currentUserId],
          },
        }),
      )
    })
  }

  const onStartClick = () => {
    history.push(`/course/${course.id.value}`)
  }

  const renderCardHeader = () => (
    <CardHeader
      avatar={
        <AvatarComponent
          userAvatar={courseOwnerAvatarOpt}
          userName={courseOwnerNameOpt}
          size={'small'}
          title={none}
          onClick={() => { return }}
        />
      }
      action={
        <IconButton onClick={onMoreClick}>
          <MoreVertIcon />
        </IconButton>}
      title={course.entity.name.getOrElse(t(UNDEFINED_MESSAGE))}
      subheader={`${t('Created')} ${ceatedDate}`}
    />
  )

  const renderCardActions = () => (
    <CardActions className='CourseCard__actions'>
      <IconButton
        aria-label='Like'
        onClick={onLikeToogle}
      >
        <FavoriteIcon
          color={getUsersLikeIdx() !== -1 ? 'secondary' : 'inherit'}
        />
      </IconButton>
      <Tooltip title={t('Start')}>
        <IconButton
          aria-label='Start'
          onClick={onStartClick}
        >
          <PlayCircleOutlineIcon />
        </IconButton>
      </Tooltip>
      <IconButton
        className={classnames(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={onExpandClick}
        aria-expanded={expanded}
        aria-label='Show more'
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions>
  )

  return (
    <Card className='CourseCard__card' variant='outlined' elevation={0}>
      {renderCardHeader()}
      <CardMedia
        className='CourseCard__media'
        image={course.entity.picture.map(v =>
            generateFileLink(v)
          ).getOrElse(require('../../assets/defaultProfile.png'))
        }
        title={course.entity.name.getOrElse(t(UNDEFINED_MESSAGE))}
      />
      <CardContent>
        <Typography variant='subtitle1'>
          {course.entity.shortDescription.getOrElse(t(UNDEFINED_MESSAGE))}
        </Typography>
      </CardContent>
      {renderCardActions()}
      <Collapse in={expanded} timeout='auto' unmountOnExit={true}>
        <CardContent>
          <Typography paragraph={true}>
            {course.entity.description.getOrElse(t(UNDEFINED_MESSAGE))}
          </Typography>
          <Typography variant='caption' paragraph={true}>
            {`${t('Modified')} ${modifiedDate}`}
          </Typography>
        </CardContent>
      </Collapse>
      {renderPopover()}
      {renderDialog()}
    </Card>
  );
}

export default withStyles(styles)(CourseCard);

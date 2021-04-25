import * as React from 'react';
import { useState } from 'react';
import classnames from 'classnames';
import update from 'immutability-helper';
import { fromNullable, none, Option } from 'fp-ts/lib/Option';
import { History } from 'history';

import { withStyles, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import { Course, ME, Id, User } from '../../api/entities';

import CourseCreateForm from '../../forms/CourseCreateForm';
import AvatarComponent from '../AvatarComponent';

import { useMaterialPopover } from '../../hooks/useMaterialPopover';
import { useI18n } from '../../hooks/useI18n';
import { useMaterialDialog } from '../../hooks/useMaterialDialog';

import { generateFileLink } from '../../utils/converters';
import { UNDEFINED_MESSAGE } from '../../utils/constants';

import './CourseCard.scss';

export const styles = (theme: Theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
})

interface IProps {
  course: ME<Course>;
  courseOwnerNameOpt: Option<string>;
  courseOwnerAvatarOpt: Option<Id<File>>;
  currentUserIdOpt: Option<Id<User>>;
  history: History;
  onCourseDelete: (courseId: Id<Course>) => void;
  updateCourse: (courseId: Id<Course>, data: { [key: string]: any }) => void;
}

const CourseCard: React.FunctionComponent<IProps & WithStyles> = ({
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
    <Card className='CourseCard__card'>
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

export default withStyles(styles as any)(CourseCard);

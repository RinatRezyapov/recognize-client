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
import { styles } from '../styles/CourseCard';
import { useMaterialDialog } from '../hooks/useMaterialDialog';
import CourseCreateForm from '../forms/CourseCreateForm';
import update from 'immutability-helper';
import Button from '@material-ui/core/Button';
import AvatarComponent from './AvatarComponent';
import LinkButton from './LinkButton';
import Divider from '@material-ui/core/Divider';

interface IProps {
  userIdOpt: Option<Id<User>>;
  classes: any;
  createCourse(course: Course): void;
}

const PlaceholderCourseCard = ({
  userIdOpt,
  classes,
  createCourse,
}: IProps) => {

  const { t } = useI18n();

  const { openDialog, closeDialog, renderDialog } = useMaterialDialog();

  const onCreateCourse = () => {

    const onCourseCreateFormSubmit = (values: any, dialogIdArg: string) => {
      userIdOpt.map(userId => createCourse(
        new Course({
          name: fromNullable(values.name),
          data: fromNullable(values.data),
          owner: userId,
          picture: fromNullable(values.picture),
          description: fromNullable(values.description),
          shortDescription: fromNullable(values.shortDescription),
          tags: fromNullable(values.tags),
          createdDate: fromNullable(new Date().getTime()),
          modifiedDate: fromNullable(new Date().getTime()),
          language: fromNullable(values.language),
          enrolled: [],
          likes: [],
        }),
      ))
      closeDialog(dialogIdArg);
    }

    const dialogId = openDialog(
      t('Create course'),
      (
        <CourseCreateForm
          onSubmit={(values: any) => onCourseCreateFormSubmit(values, dialogId)}
          initialValues={{
            buttonLabel: t('Create'),
          }}
        />
      ),
      [],
    )
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        title={'Welcome to Recognize'}
      />
      <CardContent>

        <Typography
          variant='subtitle1'
        >
          {t('Get started by picking a course')}
        </Typography>
        <div style={{ padding: 15 }}>
          <LinkButton
            path='/courses'
            color='primary'
            variant='outlined'
          >
            {t('Courses')}
          </LinkButton>
        </div>
        <Divider />
        <Typography
          variant='subtitle1'
          style={{ paddingTop: 15 }}
        >
          {t('...or creating your own!')}
        </Typography>
        <div style={{ padding: 15 }}>
          <Button
            color='primary'
            variant='outlined'
            onClick={onCreateCourse}
          >
            {t('Create course')}
          </Button>
        </div>
      </CardContent>
      {renderDialog()}
    </Card>
  );
}

export default withStyles(styles as any)(PlaceholderCourseCard)

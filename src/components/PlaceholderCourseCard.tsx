import * as React from 'react';
import { fromNullable, Option } from 'fp-ts/lib/Option';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { Course, Id, User } from '../api/entities';

import CourseCreateForm from '../forms/CourseCreateForm';
import LinkButton from './LinkButton';

import { useI18n } from '../hooks/useI18n';
import { useMaterialDialog } from '../hooks/useMaterialDialog';

import { styles } from './CourseCardStyles';

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
          picture: values.picture,
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

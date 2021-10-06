import * as React from 'react';
import { fromNullable, Option } from 'fp-ts/lib/Option';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Course, Id, User } from '../../api/entities';

import CourseCreateForm from '../../forms/CourseCreateForm';
import LinkButton from '../LinkButton';

import { useI18n } from '../../hooks/useI18n';
import { useMaterialDialog } from '../../hooks/useMaterialDialog';

import './PlaceholderCourseCard.scss';

interface IProps {
  userIdOpt: Option<Id<User>>;
  createCourse(course: Course): void;
}

const PlaceholderCourseCard: React.FunctionComponent<IProps> = ({
  userIdOpt,
  createCourse,
}) => {

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
    <Card variant='outlined' elevation={0}>
      <CardHeader
        title={'Welcome to Recognize'}
      />
      <CardContent>
        <Typography
          variant='subtitle1'
        >
          {t('Get started by picking a course')}
        </Typography>
        <LinkButton
          to='/courses'
          color='primary'
          variant='outlined'
        >
          {t('Courses')}
        </LinkButton>
        <Typography
          variant='subtitle1'
          style={{ paddingTop: 15 }}
        >
          {t('...or creating your own!')}
        </Typography>
        <Button
          color='primary'
          variant='outlined'
          onClick={onCreateCourse}
        >
          {t('Create course')}
        </Button>
      </CardContent>
      {renderDialog()}
    </Card>
  );
}

export default PlaceholderCourseCard;

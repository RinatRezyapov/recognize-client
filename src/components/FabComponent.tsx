import * as React from 'react';
import { Option, none, fromNullable } from 'fp-ts/lib/Option';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import { Course, Id, User } from '../api/entities';

import CourseCreateForm from '../forms/CourseCreateForm';

import { useMaterialDialog } from '../hooks/useMaterialDialog';
import { useI18n } from '../hooks/useI18n';

interface IProps {
  history: any;
  userIdOpt: Option<Id<User>>;
  createCourse(course: Course): void;
}

const FabComponent = ({
  userIdOpt,
  createCourse,
}: IProps) => {

  const { t } = useI18n();
  const { openDialog, closeDialog, renderDialog } = useMaterialDialog();

  const onCreateCourseClick = () => {

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
            picture: none,
          }}
        />
      ),
      [],
    )
  }

  return (
    <>
      <Fab style={{ position: 'fixed', right: 15, bottom: 15 }} color={'primary'} onClick={onCreateCourseClick}>
        <AddIcon />
      </Fab>
      {renderDialog()}
    </>
  );
}

export default FabComponent;

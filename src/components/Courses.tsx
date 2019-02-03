import * as React from 'react';
import { useEffect, useState } from 'react';
import { Option, none, fromNullable } from 'fp-ts/lib/Option';

import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid';

import { Course, ME, User, Id, SearchQuery, ExpressionEq, ExpressionContains } from '../api/entities';
import CourseCard from './CourseCard';
import { useI18n } from '../hooks/useI18n';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

interface IProps {
  history: any;
  courses: Array<ME<Course>>;
  users: Array<ME<User>>;
  userIdOpt: Option<Id<User>>;
  coursesFetching: boolean;
  fetchCourses(): void;
  createCourse(course: Course): void;
  deleteCourse(userId: Id<User>, courseId: Id<Course>): void;
  updateCourse(courseId: Id<Course>, data: { [key: string]: any }): void;
  uploadCourseFile(courseId: Id<Course>, file: ArrayBuffer): void;
  searchThunk(query: SearchQuery): void;
}

const Courses: React.FunctionComponent<IProps> = ({
  history,
  userIdOpt,
  coursesFetching,
  courses,
  users,
  fetchCourses,
  deleteCourse,
  updateCourse,
  uploadCourseFile,
  searchThunk,
}: IProps) => {

  const { t } = useI18n();
  const [searchValue, onSearchValueChange] = useState('');
  const [exactsearch, exactsearchChange] = useState(false);

  const getOwnerName = (course: ME<Course>) => {
    return fromNullable(users.filter(userMe => userMe.id.value === course.entity.owner.value)[0])
      .map(v => v.entity.name)
  }

  const getOwnerAvatar = (course: ME<Course>) => {
    return fromNullable(users.filter(userMe => userMe.id.value === course.entity.owner.value)[0])
      .chain(v => v.entity.avatar)
  }

  const onCourseDelete = (courseId: Id<Course>) => {
    userIdOpt.map((userId: Id<User>) => deleteCourse(userId, courseId));
  }

  const onCourseSearch = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    searchThunk(new SearchQuery({
      entity: Course.$Type.value,
      field: 'name',
      expression: exactsearch ? new ExpressionEq() : new ExpressionContains(),
      value: searchValue,
    }))
  }

  const onCourseSearchClear = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    fetchCourses();
  }

  const searchValueChangeHandler = (evt: any) => {
    onSearchValueChange(evt.target.value)
  }

  const onExactsearchChange = (evt: any, checked: boolean) => {
    exactsearchChange(checked)
  }

  return (
    <Grid container={true} justify='center' style={{ padding: '15px 0 0 0' }}>
      <Grid item={true} style={{ margin: '15px 0' }}>
        <Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px' }}>
          <TextField
            label={t('Search value')}
            variant='outlined'
            value={searchValue}
            onChange={searchValueChangeHandler}
          />
          <div style={{ width: '100%' }}>
            <FormControlLabel
              control={<Checkbox checked={exactsearch} onChange={onExactsearchChange} />}
              label={t('Exact search')}
            />
          </div>
          <div>
            <Button
              style={{ marginRight: 10 }}
              onClick={onCourseSearch}
              variant='raised'
              color='primary'
            >
              {t('Search')}
            </Button>
            <Button
              onClick={onCourseSearchClear}
              variant='raised'
              color='secondary'
            >
              {t('Clear')}
            </Button>
          </div>
        </Paper>
      </Grid>
      <Grid item={true} md={4} style={{ margin: '15px 15px' }}>
        {coursesFetching ?
          <CircularProgress /> :
          courses.map(course =>
            <CourseCard
              key={course.id.value}
              course={course}
              courseOwnerNameOpt={getOwnerName(course)}
              courseOwnerAvatarOpt={getOwnerAvatar(course)}
              currentUserIdOpt={userIdOpt}
              history={history}
              onCourseDelete={onCourseDelete}
              updateCourse={updateCourse}
              uploadCourseFile={uploadCourseFile}
            />,
          )
        }
      </Grid>
    </Grid>
  );
}

export default Courses;

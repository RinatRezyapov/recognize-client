import * as React from 'react';
import { useState } from 'react';
import { Option, fromNullable } from 'fp-ts/lib/Option';
import { History } from 'history';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';

import {
  Course,
  ME,
  User,
  Id,
  SearchQuery,
  ExpressionEq,
  ExpressionContains
} from '../../api/entities';

import CourseCard from '../CourseCard';

import { useI18n } from '../../hooks/useI18n';

import './Courses.scss';
import { headOption } from '../../utils/fp-ts';

interface IProps {
  history: History;
  courses: Array<ME<Course>>;
  users: Array<ME<User>>;
  userIdOpt: Option<Id<User>>;
  coursesFetching: boolean;
  fetchCourses(): void;
  createCourse(course: Course): void;
  deleteCourse(userId: Id<User>, courseId: Id<Course>): void;
  updateCourse(courseId: Id<Course>, data: { [key: string]: any }): void;
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
  searchThunk,
}) => {

  const { t } = useI18n();
  const [searchValue, onSearchValueChange] = useState('');
  const [exactsearch, exactsearchChange] = useState(false);

  const getOwnerName = (course: ME<Course>) => {
    return headOption(users.filter(userMe => userMe.id.value === course.entity.owner.value))
      .map(v => v.entity.name)
  }

  const getOwnerAvatar = (course: ME<Course>) => {
    return headOption(users.filter(userMe => userMe.id.value === course.entity.owner.value))
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

  const renderSearchPanel = () => (
    <div className='Courses__search-panel-container'>
      <Paper className='Courses__search-panel-paper' variant='outlined' elevation={0}>
        <TextField
          label={t('Search value')}
          variant='outlined'
          size='small'
          value={searchValue}
          onChange={searchValueChangeHandler}
        />
        <FormControlLabel
          className='Courses__search-panel-checkbox'
          control={<Checkbox size='small' checked={exactsearch} onChange={onExactsearchChange} />}
          label={t('Exact search')}
        />
        <div>
          <Button
            className='Courses__search-button'
            onClick={onCourseSearch}
            variant='outlined'
            color='primary'
            size='small'
          >
            {t('Search')}
          </Button>
          <Button
            onClick={onCourseSearchClear}
            variant='outlined'
            color='secondary'
            size='small'
          >
            {t('Clear')}
          </Button>
        </div>
      </Paper>
    </div>
  )

  const renderSearchResultPanel = () => (
    <div className='Courses__search-result-panel'>
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
          />,
        )
      }
    </div>
  )

  return (
    <div className='Courses__root'>
      {renderSearchPanel()}
      {renderSearchResultPanel()}
    </div>
  );
}

export default Courses;

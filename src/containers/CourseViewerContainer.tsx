import * as React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { Option } from 'fp-ts/lib/Option';

import { Course, ME, Id } from '../api/entities';
import { changeAppHeaderVisibility, changeFabButtonVisibility } from '../actions/ui';
import CourseViewer from '../components/CourseViewer';
import { IApplicationState } from '../reducers';
import { getRouterLocation } from '../selectors/router';
import { getCourse } from '../selectors/course';
import { fetchCourse } from '../thunks/courses';

interface IStateProps {
  course: Option<ME<Course>>;
}

interface IDispatchProps {
  changeAppHeaderVisibility: (visible: boolean) => void;
  changeFabButtonVisibility: (visible: boolean) => void;
  fetchCourse: (courseId: Id<Course>) => void;
}

interface IBoundProps {
  history: History;
  match: any;
}

type IProps = IStateProps & IDispatchProps & IBoundProps;

const CourseViewerContainer: React.FunctionComponent<IProps> = (props) => <CourseViewer {...props} />;

export default connect<IStateProps, IDispatchProps, IBoundProps, IApplicationState>(
  (state) => ({
    location: getRouterLocation(state),
    course: getCourse(state),
  }),
  ({
    changeAppHeaderVisibility,
    changeFabButtonVisibility,
    fetchCourse,
  }),
)(CourseViewerContainer)

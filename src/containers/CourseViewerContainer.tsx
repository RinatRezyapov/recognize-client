import * as React from 'react';
import { connect } from 'react-redux';
import { Course, ME, Id } from '../api/entities';
import { IApplicationState } from '../reducers';
import CourseViewer from '../components/CourseViewer';
import { hideAppHeader, hideFabButton } from '../actions/ui';
import { fetchCourse } from '../thunks/courses';

interface IStateProps {
  userCourses: Array<ME<Course>>;
}

interface IDispatchProps {
  hideAppHeader: () => void;
  hideFabButton: () => void;
  fetchCourse: (courseId: Id<Course>) => void;
}

interface IBoundProps {
  history: any;
  match: any;
}

type IProps = IStateProps & IDispatchProps & IBoundProps;

const CourseViewerContainer: React.FunctionComponent<IProps> = (props: IProps) => <CourseViewer {...props} />;

export default connect<IStateProps, IDispatchProps, IBoundProps, IApplicationState>(
  (state) => ({
    location: state.router.location,
    userCourses: state.auth.userId
      .map(userId => state.courses.data.filter(v => v.entity.owner.value === userId.value))
      .getOrElse([]),
  }),
  ({
    hideAppHeader,
    hideFabButton,
    fetchCourse,
  }),
)(CourseViewerContainer)

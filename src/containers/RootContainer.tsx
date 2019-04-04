import * as React from 'react';
import { connect } from 'react-redux';
import { Option } from 'fp-ts/lib/Option';
import { History } from 'history';

import { Course, User, Id } from '../api/entities';
import { IApplicationState } from '../reducers';
import { createCourse } from '../thunks/courses';
import { getUserName, getUserAvatar, getUserEmail } from '../selectors/user';
import { getUserId, getToken } from '../selectors/auth';
import { userSignOut } from '../thunks/auth';
import Root from '../components/Root';
import { getHeaderVisibility, getFabVisibility, getSnackbarVisibility, getSnackbarMessage } from '../selectors/ui';
import { changeSnackbarVisibility, ISnackbarVisibilityPayload } from '../actions/ui';

interface IStateProps {
  token: Option<string>;
  userIdOpt: Option<Id<User>>;
  userNameOpt: Option<string>;
  userAvatarOpt: Option<Id<File>>;
  userEmailOpt: Option<string>;
  isAppHeaderVisible: boolean;
  isFabButtonVisible: boolean;
  isSnackbarVisible: boolean;
  snackbarMessage: Option<string>;
}

interface IDispatchProps {
  createCourse(course: Course): void;
  userSignOut(): void;
  changeSnackbarVisibility(snackbarProps: ISnackbarVisibilityPayload): void;
}

interface IBoundProps {
  history: History;
}

type IProps = IStateProps & IDispatchProps & IBoundProps;

const RootContainer: React.FunctionComponent<IProps> = (props) => <Root {...props} />

export default connect<IStateProps, IDispatchProps, IBoundProps, IApplicationState>(
  (state) => ({
    token: getToken(state),
    userNameOpt: getUserName(state),
    userAvatarOpt: getUserAvatar(state),
    userEmailOpt: getUserEmail(state),
    userIdOpt: getUserId(state),
    isAppHeaderVisible: getHeaderVisibility(state),
    isFabButtonVisible: getFabVisibility(state),
    isSnackbarVisible: getSnackbarVisibility(state),
    snackbarMessage: getSnackbarMessage(state),
  }),
  ({
    userSignOut,
    createCourse,
    changeSnackbarVisibility,
  }),
)(RootContainer)

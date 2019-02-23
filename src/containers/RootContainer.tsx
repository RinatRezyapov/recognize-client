import * as React from 'react';
import { connect } from 'react-redux';
import { Option } from 'fp-ts/lib/Option';

import { Course, User, Id } from '../api/entities';
import { IState as IAuthState } from '../reducers/auth';
import { IApplicationState } from '../reducers';
import { createCourse } from '../thunks/courses';
import { getUserName, getUserAvatar, getUserEmail } from '../selectors/user';
import { getUserId } from '../selectors/auth';
import { fetchUser } from '../thunks/user';
import { userSignOut } from '../thunks/auth';
import Root from '../components/Root';

interface IStateProps {
  auth: IAuthState;
  userIdOpt: Option<Id<User>>;
  userNameOpt: Option<string>;
  userAvatarOpt: Option<Id<File>>;
  userEmailOpt: Option<string>;
  hideAppHeader: boolean;
  hideFabButton: boolean;
}

interface IDispatchProps {
  fetchUser(userId: Id<User>): void;
  createCourse(course: Course): void;
  userSignOut(): void;
}

interface IBoundProps {
  history: any;
}

type IProps = IStateProps & IDispatchProps & IBoundProps;

const RootContainer: React.FunctionComponent<IProps> = (props: IProps) => <Root {...props} />

export default connect<IStateProps, IDispatchProps, IBoundProps, IApplicationState>(
  (state) => ({
    auth: state.auth,
    userNameOpt: getUserName(state),
    userAvatarOpt: getUserAvatar(state),
    userEmailOpt: getUserEmail(state),
    userIdOpt: getUserId(state),
    hideAppHeader: state.ui.hideAppHeader,
    hideFabButton: state.ui.hideFabButton,
  }),
  ({
    fetchUser,
    userSignOut,
    createCourse,
  }),
)(RootContainer)

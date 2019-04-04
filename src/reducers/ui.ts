import update from 'immutability-helper';
import { handleActions, Action } from 'redux-actions';
import { fromNullable, none, Option } from 'fp-ts/lib/Option';
import { 
  UI_CHANGE_APPHEADER_VISIBILITY, 
  UI_CHANGE_FAB_BUTTON_VISIBILITY, 
  UI_CHANGE_SNACKBAR_BUTTON_VISIBILITY, 
  ISnackbarVisibilityPayload
} from '../actions/ui';

export interface IState {
  isAppHeaderVisible: boolean;
  isFabButtonVisible: boolean;
  snackbar: {
    visible: boolean,
    message: Option<string>,
  };
}

const initialState = {
  isAppHeaderVisible: true,
  isFabButtonVisible: true,
  snackbar: {
    visible: false,
    message: none
  },
}

export default handleActions<IState, any>({
  [UI_CHANGE_APPHEADER_VISIBILITY]: (state: IState, action: Action<boolean>): IState =>
    fromNullable(action.payload).map(payload =>
      update(state, {
        isAppHeaderVisible: {
          $set: payload,
        },
      })
    ).getOrElse(state),
  [UI_CHANGE_FAB_BUTTON_VISIBILITY]: (state: IState, action: Action<boolean>): IState =>
    fromNullable(action.payload).map(payload =>
      update(state, {
        isFabButtonVisible: {
          $set: payload,
        },
      })
    ).getOrElse(state),
  [UI_CHANGE_SNACKBAR_BUTTON_VISIBILITY]: (state: IState, action: Action<ISnackbarVisibilityPayload>): IState =>
    fromNullable(action.payload).map(payload =>
      update(state, {
        snackbar: {
          visible: {
            $set: payload.visible,
          },
          message: {
            $set: payload.message
          },
        }
      })
    ).getOrElse(state),
}, initialState)

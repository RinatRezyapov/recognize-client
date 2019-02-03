import update from 'immutability-helper';
import { handleActions, Action } from 'redux-actions'
import { UI_HIDE_APPHEADER, UI_HIDE_FAB_BUTTON } from '../actions/ui';

export interface IState {
  hideAppHeader: boolean;
  hideFabButton: boolean;
}

const initialState = {
  hideAppHeader: false,
  hideFabButton: false,
}

export default handleActions<IState, any>({
  [UI_HIDE_APPHEADER]: (state: IState, action: Action<void>): IState =>
    update(state, {
      hideAppHeader: {
        $set: true,
      },
    }) as IState,
  [UI_HIDE_FAB_BUTTON]: (state: IState, action: Action<void>): IState =>
    update(state, {
      hideFabButton: {
        $set: true,
      },
    }) as IState,
}, initialState)

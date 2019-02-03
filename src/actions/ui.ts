import { createAction } from 'redux-actions';

export const UI_HIDE_APPHEADER = 'UI.HideAppHeader';
export const hideAppHeader = createAction(UI_HIDE_APPHEADER);

export const UI_HIDE_FAB_BUTTON = 'UI.HideFabButton';
export const hideFabButton = createAction(UI_HIDE_FAB_BUTTON);

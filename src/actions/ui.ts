import { createAction } from 'redux-actions';
import { Option } from 'fp-ts/lib/Option';

export const UI_CHANGE_APPHEADER_VISIBILITY = 'UI.ChangeAppHeaderVisibility';
export const changeAppHeaderVisibility = createAction<boolean, boolean>(
  UI_CHANGE_APPHEADER_VISIBILITY,
  (p: boolean) => p,
);

export const UI_CHANGE_FAB_BUTTON_VISIBILITY = 'UI.ChangeFabButtonVisibility';
export const changeFabButtonVisibility = createAction<boolean, boolean>(
  UI_CHANGE_FAB_BUTTON_VISIBILITY,
  (p: boolean) => p,
);

export const UI_CHANGE_SNACKBAR_BUTTON_VISIBILITY = 'UI.ChangeSnackbarVisibility';
export interface ISnackbarVisibilityPayload {
  visible: boolean;
  message: Option<string>;
};
export const changeSnackbarVisibility = createAction<ISnackbarVisibilityPayload, ISnackbarVisibilityPayload>(
  UI_CHANGE_SNACKBAR_BUTTON_VISIBILITY,
  (p: ISnackbarVisibilityPayload) => p,
);

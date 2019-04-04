import { IApplicationState } from '../reducers';

export const getHeaderVisibility = (state: IApplicationState) => state.ui.isAppHeaderVisible;
export const getFabVisibility = (state: IApplicationState) => state.ui.isFabButtonVisible;
export const getSnackbarVisibility = (state: IApplicationState) => state.ui.snackbar.visible;
export const getSnackbarMessage = (state: IApplicationState) => state.ui.snackbar.message;

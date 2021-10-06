import * as React from 'react';
import { none, Option } from 'fp-ts/lib/Option';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useI18n } from '../../hooks/useI18n';
import { ISnackbarVisibilityPayload } from '../../actions/ui';

interface IProps {
  isSnackbarVisible: boolean;
  snackbarMessage: Option<string>;
  changeSnackbarVisibility(snackbarProps: ISnackbarVisibilityPayload): void;
}

const SnackbarComponent: React.FunctionComponent<IProps> = ({
  isSnackbarVisible,
  snackbarMessage,
  changeSnackbarVisibility,
}) => {

  const { t } = useI18n();

  const handleClose = (event: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    changeSnackbarVisibility({ visible: false, message: none });
  }

  return (
    <div>
      <Snackbar
        open={isSnackbarVisible}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <span id='message-id'>
            {snackbarMessage.map(v => t(v)).getOrElse('Unexpected error')}
          </span>
        }
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}

export default SnackbarComponent;

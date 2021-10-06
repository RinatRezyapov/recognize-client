import * as React from 'react';
import { useState } from 'react';
import * as uuid from 'uuid';
import { Option, none, fromNullable } from 'fp-ts/lib/Option';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

class DialogConstructor {
  id: string;
  open: boolean;
  title: Option<string>;
  content: Option<React.ReactElement<any>>;
  actions: JSX.Element[];
  maxWidth: 'xs' | 'sm' | 'md' | 'lg' | false;

  constructor(
    title?: Option<string>,
    content?: Option<React.ReactElement<any>>,
    actions?: JSX.Element[],
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | false,
  ) {
    this.id = uuid.v4();
    this.open = true;
    this.title = title || none;
    this.content = content || none;
    this.actions = actions || [];
    this.maxWidth = maxWidth || 'md';
  }
}

export const useMaterialDialog = () => {

  interface IState {
    dialogs: DialogConstructor[],
  }

  const initialState: IState = {
    dialogs: [],
  }

  const [state, setState] = useState(initialState);

  const openDialog = (
    title: string,
    content: JSX.Element,
    actions: JSX.Element[],
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | false,
  ): string => {

    const newDialog = new DialogConstructor(fromNullable(title), fromNullable(content), actions, maxWidth);

    setState({
      dialogs: [
        ...state.dialogs,
        newDialog,
      ],
    })

    return newDialog.id;
  }

  const closeDialog = (id: string): void => {
    const newDialogs = state.dialogs.filter(dialog => dialog.id !== id);
    setState({
      dialogs: newDialogs,
    })
  }

  const renderDialog = () =>
    state.dialogs.map(dialog =>
      (
        <Dialog
          key={dialog.id}
          fullWidth={true}
          maxWidth={dialog.maxWidth}
          open={dialog.open}
        >
          <DialogTitle>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>{dialog.title.getOrElse('')}</div>
              <IconButton onClick={() => closeDialog(dialog.id)}><ClearIcon /></IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            {dialog.content.getOrElse(<div />)}
          </DialogContent>
          <DialogActions>
            {dialog.actions}
          </DialogActions>
        </Dialog>
      ),
    )

  return ({ openDialog, closeDialog, renderDialog });
}

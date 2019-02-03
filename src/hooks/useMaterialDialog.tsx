import * as React from 'react';
import { useState } from 'react';
import * as uuid from 'uuid';
import { Option, none, fromNullable } from 'fp-ts/lib/Option';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

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

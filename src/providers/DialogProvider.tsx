import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { fromNullable } from 'fp-ts/lib/Option';
import DialogConstructor from './DialogConstructor';
import { IWithDialogProps } from '../decorators/withDialogProps';

interface IState {
    dialogs: DialogConstructor[],
}

const DialogProviderContext = React.createContext<IWithDialogProps>({
    openDialog: () => '',
    closeDialog: () => {return},
});

export class DialogProvider extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            dialogs: [],
        }

        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    openDialog(
        title: string,
        content: JSX.Element,
        actions: JSX.Element[],
        maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | false,
    ): string {

        const newDialog = new DialogConstructor(fromNullable(title), fromNullable(content), actions, maxWidth);

        this.setState({
            dialogs: [
                ...this.state.dialogs,
                newDialog,
            ],
        })

        return newDialog.id;
    }

    closeDialog(id: string): void {
        const newDialogs = this.state.dialogs.filter(dialog => dialog.id !== id);
        this.setState({
            dialogs: newDialogs,
        })
    }

    render() {
        return (
            <DialogProviderContext.Provider
                value={{
                    openDialog: this.openDialog,
                    closeDialog: this.closeDialog,
                }}
            >
                {this.props.children}
                {this.state.dialogs.map(dialog =>
                    <Dialog
                        key={dialog.id}
                        fullWidth={true}
                        maxWidth={dialog.maxWidth}
                        open={dialog.open}
                    >
                        <DialogTitle>
                            {dialog.title.getOrElse('')}
                        </DialogTitle>
                        <DialogContent>
                            {dialog.content.getOrElse(<div />)}
                        </DialogContent>
                        <DialogActions>
                            {dialog.actions}
                        </DialogActions>
                    </Dialog>)}
            </DialogProviderContext.Provider>
        )
    }
}

export const DialogConsumer = DialogProviderContext.Consumer;

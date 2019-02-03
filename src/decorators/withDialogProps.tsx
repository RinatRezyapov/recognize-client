import * as React from 'react';
import { DialogConsumer } from '../providers/DialogProvider';

export interface IWithDialogProps {
    openDialog: (
        dialogTitle: string,
        dialogContent: JSX.Element,
        dialogActions: JSX.Element[],
        maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | false,
    ) => string,
    closeDialog: (id: string) => void,
}

export default <P extends {}>(WrappedComponent: React.ComponentType<P & IWithDialogProps>) => {
    return class extends React.Component<P, {}> {
        render() {
            return (
                <DialogConsumer>
                    {(value: IWithDialogProps) => {

                        return <WrappedComponent
                            {...value}
                            {...this.props}
                        />
                    }}
                </DialogConsumer>
            )
        }
    }
}

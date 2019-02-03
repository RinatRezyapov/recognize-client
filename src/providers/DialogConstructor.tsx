import { Option, none } from 'fp-ts/lib/Option';
import * as uuid from 'uuid';

export default class DialogConstructor {
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

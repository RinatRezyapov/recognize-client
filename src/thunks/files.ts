import { Id } from '../api/entities';
import * as ProtocolFiles from '../api/protocol/files';
import ws from '../api/ws';

export const uploadFile = (file: string) => ws.send<Id<File>>(new ProtocolFiles.Send(file));

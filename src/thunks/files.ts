import { Id, Course } from '../api/entities';
import * as ProtocolFiles from '../api/protocol/files';
import ws from '../api/ws';
import { Dispatch } from 'redux';
import { IApplicationState } from '../reducers';
import { fromNullable } from 'fp-ts/lib/Option';
import { updateCourse } from './courses';

export const uploadFile = (file: string) => {
  return ws.send<Id<File>>(new ProtocolFiles.Send(file));
}
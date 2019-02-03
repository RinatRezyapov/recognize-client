import { Id, Course } from '../api/entities';
import * as ProtocolFiles from '../api/protocol/files';
import ws from '../api/ws';
import { Dispatch } from 'redux';
import { IApplicationState } from '../reducers';
import { fromNullable } from 'fp-ts/lib/Option';
import { updateCourse } from './courses';

export const uploadFile = (file: ArrayBuffer) => {
  return ws.send<Id<File>>(new ProtocolFiles.Send(file));
}

export const uploadCourseFile = (courseId: Id<Course>, file: ArrayBuffer) =>
  async (dispatch: Dispatch, getState: () => IApplicationState) => {
    const state = getState();

    return ws.send<Id<File>>(new ProtocolFiles.Send(file))
      .then(response => {

        dispatch(updateCourse(courseId, { picture: fromNullable(response) }) as any)
      })
  }

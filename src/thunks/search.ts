import { Dispatch } from 'redux';
import { fromNullable } from 'fp-ts/lib/Option';
import to from 'await-to-js';

import { ME, Course, SearchQuery } from '../api/entities';
import { coursesFetching, coursesResolved, coursesError } from '../actions/courses';
import * as ProtocolSearch from '../api/protocol/search';
import ws from '../api/ws';

export const searchThunk = (query: SearchQuery) => async (dispatch: Dispatch) => {
  dispatch(coursesFetching());
  const [optionalError, optionalResult] = await to(ws.send<Array<ME<Course>>>(new ProtocolSearch.SimpleSearch(query)));
  fromNullable(optionalResult)
    .map(result => dispatch(coursesResolved({ result })))
  fromNullable(optionalError)
    .map(error => dispatch(coursesError({ error })))
}

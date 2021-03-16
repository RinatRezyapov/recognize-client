import { none } from 'fp-ts/lib/Option';
import { fromJSON } from './JSON';

const handleError = (error: any) => {
  console.log('Server response error', error)
}

const handleResult = (result: any) => {
  switch (result.tpe.value) {
    case 'ServerResponse.ObjectsListResolved':
      return result.data.map((data: any) => fromJSON(data));
    case 'ServerResponse.ObjectResolved':
      return fromJSON(result.data);
    default:

      console.log('default')

  }
}

export const handleApiResponse = <R>(promise: Promise<any>): Promise<R> => {
  return new Promise((res, rej) => {
    promise.then(response => {
      switch (response[0]) {
        case 0:
          rej(handleError(response[1]));
          break;
        case 1:
          res(handleResult(response[1]));
          break;
        default:
          rej(response[1]);
      }
    })
    .catch(e => {
      console.log(e);
      rej(e);
    })
  })
}

import _omit from 'lodash-es/omit';
import _mapValues from 'lodash-es/mapValues';

import typeConstructors from './typeConstructors';
import { fromNullable } from 'fp-ts/lib/Option';

export const fromJSON = <T>(data: any): any => {
  if (data._tag) {
    return fromNullable(data.value)
  }
  const typeOf = typeof data;
  if (!data) {
    return data
  } else if (typeOf === 'string') {
    return data
  } else if (typeOf === 'number') {
    return data
  } else if (typeOf === 'boolean') {
    return data
  } else if (data instanceof Array) {
    return fromJSONArray<T>(data)
  } else if (!data.hasOwnProperty('tpe')) {
    return Object.keys(data)
      .reduce((acc, curr) => ({ ...acc, [curr]: fromJSON(data[curr]) }), {});
  } else {
    return fromJSONObject<T>(data)
  }
}

const fromJSONArray = <T>(data: any[]): any[] => {
  return data.map(v => fromJSON(v));
}

const fromJSONObject = <T>(data: any = {}): any => {

  return fromNullable((<any>typeConstructors)[data.tpe.value])
    .map(typeConstructor => {

      const tpeOmmitedData = _omit(data, ['tpe']);
      const subKeys = _mapValues(tpeOmmitedData, value => fromJSON(value));

      return new typeConstructor(subKeys);
    })
    .getOrElse(() => {
      throw new Error(`Undefined typeConstructor ${data.tpe.value}`)
    })

}

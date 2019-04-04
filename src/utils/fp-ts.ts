import { Option, none, some } from 'fp-ts/lib/Option';

export const headOption = <T>(as: T[]): Option<T> => as.length > 0 ? some(as[0]) : none;

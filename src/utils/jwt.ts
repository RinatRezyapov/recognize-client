import { fromNullable } from 'fp-ts/lib/Option';

export const parseJwt = (token: string) => {
  const base64Url = fromNullable<string>(token.split('.')[1]);
  const base64 = base64Url.map(value =>
    value
      .replace('-', '+')
      .replace('_', '/'),
  )
  .getOrElse('');

  return JSON.parse(window.atob(base64));
}

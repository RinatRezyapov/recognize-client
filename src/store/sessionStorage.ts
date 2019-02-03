import { fromNullable } from 'fp-ts/lib/Option';

export const loadToken = () => {
  return fromNullable(sessionStorage.getItem('token'));
}

export const setToken = (token: string) => {
  sessionStorage.setItem('token', token)
}

export const removeToken = () => {
  sessionStorage.removeItem('token')
}

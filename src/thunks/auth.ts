import { Dispatch } from 'redux';
import { fromNullable } from 'fp-ts/lib/Option';
import { to } from 'await-to-js';
import { signIn, signInError, signOut } from '../actions/auth';
import config from '../config/config';

export const userSignIn = (login: string, password: string) =>
    async (dispatch: Dispatch) => {
        const [optionalError, optionalResult] = await to(fetch(`${config.apiEndPointHttp}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: login,
                password,
            }),
        }))
        fromNullable(optionalResult)
            .map(async result => {
                const resultJSON = await result.json();
                dispatch(signIn(resultJSON.token));
            })
        fromNullable(optionalError)
            .map(error => dispatch(signInError(error)))
    }

export const userSignUp = (login: string, password: string, name: string) =>
    async (dispatch: Dispatch) => {
        const [optionalError, optionalResult] = await to(fetch(`${config.apiEndPointHttp}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: login,
                password,
                name,
                joinedDate: fromNullable(new Date().getTime()),
            }),
        }))
        fromNullable(optionalResult)
            .map(async result => {
                const resultJSON = await result.json();
                dispatch(signIn(resultJSON.token));
            })
        fromNullable(optionalError)
            .map(error => dispatch(signInError(error)))
    }

export const userSignOut = () => (dispatch: Dispatch) => dispatch(signOut())
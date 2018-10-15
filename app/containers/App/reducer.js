/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { getItemFromStorage } from 'utils/storage';
import {
  AUTH_REDUCER_KEY,
  LOGIN_SUCCESS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  auth: {
    token: getItemFromStorage('token'),
    isAuthenticated: getItemFromStorage('token') !== null,
    username: getItemFromStorage('username'),
  },
});

function appReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case LOGIN_SUCCESS: {
      const { token, username } = action;

      return state
        .setIn([AUTH_REDUCER_KEY, 'token'], token)
        .setIn([AUTH_REDUCER_KEY, 'isAuthenticated'], true)
        .setIn([AUTH_REDUCER_KEY, 'username'], username);
    }
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;

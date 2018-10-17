import { fromJS } from 'immutable';

import { getItemFromStorage } from 'utils/storage';
import appReducer from '../reducer';
import {
  loadRepos,
  reposLoaded,
  repoLoadingError,
  loginSuccess,
} from '../actions';
import { AUTH_REDUCER_KEY } from '../constants';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      currentUser: false,
      userData: fromJS({
        repositories: false,
      }),
      auth: {
        token: getItemFromStorage('token'),
        isAuthenticated: getItemFromStorage('token') !== null,
        username: getItemFromStorage('username'),
      },
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadRepos action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .setIn(['userData', 'repositories'], false);

    expect(appReducer(state, loadRepos())).toEqual(expectedResult);
  });

  it('should handle the reposLoaded action correctly', () => {
    const fixture = [
      {
        name: 'My Repo',
      },
    ];
    const username = 'test';
    const expectedResult = state
      .setIn(['userData', 'repositories'], fixture)
      .set('loading', false)
      .set('currentUser', username);

    expect(appReducer(state, reposLoaded(fixture, username))).toEqual(
      expectedResult,
    );
  });

  it('should handle the repoLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = state.set('error', fixture).set('loading', false);

    expect(appReducer(state, repoLoadingError(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the loginSuccess action correctly', () => {
    const username = 'test';
    const token = '12345';
    const isAuthenticated = true;

    const fixture = {
      username,
      token,
      isAuthenticated,
    };

    const expectedResult = state
      .setIn([AUTH_REDUCER_KEY, 'token'], token)
      .setIn([AUTH_REDUCER_KEY, 'isAuthenticated'], isAuthenticated)
      .setIn([AUTH_REDUCER_KEY, 'username'], username);

    expect(appReducer(state, loginSuccess(fixture))).toEqual(expectedResult);
  });
});

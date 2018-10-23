/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

/* istanbul ignore file */

export const APP_NAME = 'Paige';
export const APP_NAME_NORMALIZED = 'paige';
export const APP_BRAND = 'paige';

export const META_DESCRIPTION =
  'Paige extracts data from websites and turns any website into an API';
export const API_BASE =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/api'
    : 'http://localhost:8080/api';

// Reducer keys
export const AUTH_REDUCER_KEY = 'auth';

// Action types
export const LOAD_REPOS = `${APP_NAME_NORMALIZED}/App/LOAD_REPOS`;
export const LOAD_REPOS_SUCCESS = `${APP_NAME_NORMALIZED}/App/LOAD_REPOS_SUCCESS`;
export const LOAD_REPOS_ERROR = `${APP_NAME_NORMALIZED}/App/LOAD_REPOS_ERROR`;
export const LOGIN_SUCCESS = `${APP_NAME_NORMALIZED}/Login/LOGIN_SUCCESS`;

/* istanbul ignore file */

import { APP_NAME_NORMALIZED } from 'containers/App/constants';

// Reducer keys
export const ERROR_REDUCER_KEY = 'error';
export const ERRORS_REDUCER_KEY = 'errors';
export const VALUES_REDUCER_KEY = 'values';
export const SUBMITTING_REDUCER_KEY = 'submitting';
export const RESPONSE_REDUCER_KEY = 'response';

// Action types
export const INITIALIZE_FORM = `${APP_NAME_NORMALIZED}/Form/INITIALIZE_FORM`;
export const SET_FORM_FIELD_ERRORS = `${APP_NAME_NORMALIZED}/Form/SET_FORM_FIELD_ERRORS`;
export const SET_FORM_FIELD_VALUE = `${APP_NAME_NORMALIZED}/Form/SET_FORM_FIELD_VALUE`;
export const SUBMIT_FORM = `${APP_NAME_NORMALIZED}/Form/SUBMIT_FORM`;
export const SUBMIT_FORM_SUCCESS = `${APP_NAME_NORMALIZED}/Form/SUBMIT_FORM_SUCCESS`;
export const SUBMIT_FORM_ERROR = `${APP_NAME_NORMALIZED}/Form/SUBMIT_FORM_ERROR`;
export const CLEAR_FORM_ERRORS = `${APP_NAME_NORMALIZED}/Form/CLEAR_FORM_ERRORS`;
export const CANCEL_SUBMIT_FORM = `${APP_NAME_NORMALIZED}/Form/CANCEL_SUBMIT_FORM`;

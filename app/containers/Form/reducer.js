import { fromJS } from 'immutable';

import {
  CANCEL_SUBMIT_FORM,
  ERROR_REDUCER_KEY,
  ERRORS_REDUCER_KEY,
  VALUES_REDUCER_KEY,
  RESPONSE_REDUCER_KEY,
  SUBMITTING_REDUCER_KEY,
  INITIALIZE_FORM,
  SET_FORM_FIELD_VALUE,
  SET_FORM_FIELD_ERRORS,
  SUBMIT_FORM_ERROR,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM,
  CLEAR_FORM_ERRORS,
} from './constants';

// Initial form state
const formInitialState = fromJS({});

function formReducer(state = formInitialState, action) {
  const {
    type,
    formKey,
    formField,
    fields,
    value,
    response,
    error,
    errors,
  } = action;

  switch (type) {
    case INITIALIZE_FORM: {
      const values = {};

      Object.keys(fields).forEach(field => {
        values[field] = fields[field].initialValue
          ? fields[field].initialValue
          : '';
      });

      return state.setIn([formKey, VALUES_REDUCER_KEY], fromJS(values));
    }
    case SET_FORM_FIELD_VALUE: {
      return state.setIn([formKey, VALUES_REDUCER_KEY, formField], value);
    }
    case SET_FORM_FIELD_ERRORS: {
      return state.setIn([formKey, ERRORS_REDUCER_KEY], errors);
    }
    case CLEAR_FORM_ERRORS: {
      return state
        .setIn([formKey, ERROR_REDUCER_KEY], null)
        .setIn([formKey, ERRORS_REDUCER_KEY], null);
    }
    case SUBMIT_FORM: {
      return state.setIn([formKey, SUBMITTING_REDUCER_KEY], true);
    }
    case SUBMIT_FORM_ERROR: {
      return state
        .setIn([formKey, SUBMITTING_REDUCER_KEY], false)
        .setIn([formKey, ERROR_REDUCER_KEY], error);
    }
    case SUBMIT_FORM_SUCCESS: {
      return state
        .setIn([formKey, SUBMITTING_REDUCER_KEY], false)
        .setIn([formKey, RESPONSE_REDUCER_KEY], response);
    }
    case CANCEL_SUBMIT_FORM: {
      return state.setIn([formKey, SUBMITTING_REDUCER_KEY], false);
    }
    default:
      return state;
  }
}

export default formReducer;

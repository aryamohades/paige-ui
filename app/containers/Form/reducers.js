import { fromJS } from 'immutable';

import {
  ERRORS_REDUCER_KEY,
  VALUES_REDUCER_KEY,
  INITIALIZE_FORM,
  SET_FORM_FIELD_VALUE,
  SET_FORM_FIELD_ERRORS,
} from './constants';

// Initial form state
const formInitialState = fromJS({});

function formReducer(state = formInitialState, action) {
  switch (action.type) {
    case SET_FORM_FIELD_VALUE: {
      const { formKey, formField, value } = action;
      return state.setIn([formKey, VALUES_REDUCER_KEY, formField], value);
    }
    case SET_FORM_FIELD_ERRORS: {
      const { formKey, errors } = action;
      return state.setIn([formKey, ERRORS_REDUCER_KEY], errors);
    }
    case INITIALIZE_FORM: {
      const { formKey, fields } = action;
      const values = {};

      Object.keys(fields).forEach(field => {
        values[field] = fields[field].initialValue
          ? fields[field].initialValue
          : '';
      });

      return state.setIn([formKey, VALUES_REDUCER_KEY], fromJS(values));
    }
    default:
      return state;
  }
}

export default formReducer;

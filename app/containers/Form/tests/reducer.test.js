import { fromJS } from 'immutable';

import formReducer from '../reducer';
import {
  initializeForm,
  setFormFieldValue,
  setFormFieldErrors,
  clearFormErrors,
  submitForm,
  submitFormError,
  submitFormSuccess,
  cancelSubmitForm,
} from '../actions';
import {
  VALUES_REDUCER_KEY,
  ERRORS_REDUCER_KEY,
  ERROR_REDUCER_KEY,
  SUBMITTING_REDUCER_KEY,
  RESPONSE_REDUCER_KEY,
} from '../constants';

const testFormKey = 'test';
const testFormField = 'test';
const testFields = {
  one: {
    type: String,
    initialValue: 'test',
  },
  two: {
    type: String,
  },
};

describe('formReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({});
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(formReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the initializeForm action correctly', () => {
    const fixture = fromJS({
      [VALUES_REDUCER_KEY]: {
        one: 'test',
        two: '',
      },
    });
    const expectedResult = state.set(testFormKey, fixture);

    expect(formReducer(state, initializeForm(testFormKey, testFields))).toEqual(
      expectedResult,
    );
  });

  it('should handle the setFormFieldValue action correctly', () => {
    const newTestValue = 'newValue';

    const expectedResult = state.setIn(
      [testFormKey, VALUES_REDUCER_KEY, testFormField],
      newTestValue,
    );
    expect(
      formReducer(
        state,
        setFormFieldValue(testFormKey, testFormField, newTestValue),
      ),
    ).toEqual(expectedResult);
  });

  it('should handle the setFormFieldErrors action correctly', () => {
    const testError = 'error';
    const fixture = fromJS({ [testFormField]: testError });
    const expectedResult = state.setIn(
      [testFormKey, ERRORS_REDUCER_KEY],
      fixture,
    );
    expect(
      formReducer(state, setFormFieldErrors(testFormKey, fixture)),
    ).toEqual(expectedResult);
  });

  it('should handle the clearFormErrors action correctly', () => {
    const expectedResult = state
      .setIn([testFormKey, ERRORS_REDUCER_KEY], null)
      .setIn([testFormKey, ERROR_REDUCER_KEY], null);
    expect(formReducer(state, clearFormErrors(testFormKey))).toEqual(
      expectedResult,
    );
  });

  it('should handle the submitForm action correctly', () => {
    const expectedResult = state.setIn(
      [testFormKey, SUBMITTING_REDUCER_KEY],
      true,
    );
    expect(formReducer(state, submitForm(testFormKey, '/test', {}))).toEqual(
      expectedResult,
    );
  });

  it('should handle the submitFormError action correctly', () => {
    const error = 'error';
    const expectedResult = state
      .setIn([testFormKey, ERROR_REDUCER_KEY], error)
      .setIn([testFormKey, SUBMITTING_REDUCER_KEY], false);
    expect(formReducer(state, submitFormError(testFormKey, error))).toEqual(
      expectedResult,
    );
  });

  it('should handle the submitFormSuccess action correctly', () => {
    const fixture = { message: 'hello' };
    const expectedResult = state
      .setIn([testFormKey, RESPONSE_REDUCER_KEY], fixture)
      .setIn([testFormKey, SUBMITTING_REDUCER_KEY], false);
    expect(formReducer(state, submitFormSuccess(testFormKey, fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the cancelSubmitForm action correctly', () => {
    const expectedResult = state.setIn(
      [testFormKey, SUBMITTING_REDUCER_KEY],
      false,
    );
    expect(formReducer(state, cancelSubmitForm(testFormKey))).toEqual(
      expectedResult,
    );
  });
});

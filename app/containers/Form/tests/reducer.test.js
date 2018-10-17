import { fromJS } from 'immutable';

import formReducer from '../reducer';
import {
  initializeForm,
  setFormFieldValue,
  setFormFieldErrors,
} from '../actions';
import { VALUES_REDUCER_KEY, ERRORS_REDUCER_KEY } from '../constants';

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
});

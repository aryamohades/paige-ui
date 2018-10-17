import { fromJS } from 'immutable';

import {
  ERRORS_REDUCER_KEY,
  VALUES_REDUCER_KEY,
  SUBMITTING_REDUCER_KEY,
} from '../constants';
import {
  selectForm,
  makeSelectFormFieldValues,
  makeSelectFormFieldValue,
  makeSelectFormFieldError,
  makeSelectIsFormSubmitting,
} from '../selectors';

describe('selectHome', () => {
  it('should select the form state', () => {
    const formState = fromJS({
      test: {},
    });
    const mockedState = fromJS({
      form: formState,
    });
    expect(selectForm(mockedState)).toEqual(formState);
  });
});

describe('makeSelectFormFieldValues', () => {
  const testFormKey = 'test';
  const testFormValues = fromJS({ test: 'test' });
  const formValuesSelector = makeSelectFormFieldValues(testFormKey);
  it('should select the form field values', () => {
    const mockedState = fromJS({
      form: {
        [testFormKey]: {
          [VALUES_REDUCER_KEY]: testFormValues,
        },
      },
    });
    expect(formValuesSelector(mockedState).toJS()).toEqual(
      testFormValues.toJS(),
    );
  });
});

describe('makeSelectFormFieldValue', () => {
  const testFormKey = 'test';
  const testFormField = 'test';
  const testFormFieldValue = 'test';
  const testFormValues = fromJS({ [testFormField]: testFormFieldValue });
  const formValueSelector = makeSelectFormFieldValue(
    testFormKey,
    testFormField,
  );

  it('should select the form field value', () => {
    const mockedState = fromJS({
      form: {
        [testFormKey]: {
          [VALUES_REDUCER_KEY]: testFormValues,
        },
      },
    });

    expect(formValueSelector(mockedState)).toEqual(testFormFieldValue);
  });
});

describe('makeSelectFormFieldError', () => {
  const testFormKey = 'test';
  const testFormField = 'test';
  const testFormFieldError = 'test';
  const testFormErrors = fromJS({ [testFormField]: testFormFieldError });
  const formFieldErrorSelector = makeSelectFormFieldError(
    testFormKey,
    testFormField,
  );

  it('should select the form field error', () => {
    const mockedState = fromJS({
      form: {
        [testFormKey]: {
          [ERRORS_REDUCER_KEY]: testFormErrors,
        },
      },
    });

    expect(formFieldErrorSelector(mockedState)).toEqual(testFormFieldError);
  });
});

describe('makeSelectIsFormSubmitting', () => {
  const testFormKey = 'test';
  const isSubmitting = false;
  const formIsSubmittingSelector = makeSelectIsFormSubmitting(testFormKey);

  it('should select the form submitting', () => {
    const mockedState = fromJS({
      form: {
        [testFormKey]: {
          [SUBMITTING_REDUCER_KEY]: isSubmitting,
        },
      },
    });

    expect(formIsSubmittingSelector(mockedState)).toEqual(isSubmitting);
  });
});

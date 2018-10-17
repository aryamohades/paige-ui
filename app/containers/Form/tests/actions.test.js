import {
  INITIALIZE_FORM,
  SET_FORM_FIELD_VALUE,
  SET_FORM_FIELD_ERRORS,
  CLEAR_FORM_ERRORS,
  SUBMIT_FORM,
  SUBMIT_FORM_ERROR,
  SUBMIT_FORM_SUCCESS,
  CANCEL_SUBMIT_FORM,
} from '../constants';
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

const formKey = 'test';
const formField = 'test';
const fields = [{ test: { type: String } }];
const value = 'test';
const errors = [{ test: 'error' }];
const endpoint = 'test';
const data = { test: 'test' };
const onSuccess = 'SUCCESS_TYPE';
const onError = 'ERROR_TYPE';
const response = { test: 'test' };
const error = 'error';

describe('Form Actions', () => {
  describe('initializeForm', () => {
    it('should return initializeForm action', () => {
      const expectedResult = {
        type: INITIALIZE_FORM,
        formKey,
        fields,
      };
      expect(initializeForm(formKey, fields)).toEqual(expectedResult);
    });
  });

  describe('setFormFieldValue', () => {
    it('should return setFormFieldValue action', () => {
      const expectedResult = {
        type: SET_FORM_FIELD_VALUE,
        formKey,
        formField,
        value,
      };
      expect(setFormFieldValue(formKey, formField, value)).toEqual(
        expectedResult,
      );
    });
  });

  describe('setFormFieldErrors', () => {
    it('should return setFormFieldErrors action', () => {
      const expectedResult = {
        type: SET_FORM_FIELD_ERRORS,
        formKey,
        errors,
      };
      expect(setFormFieldErrors(formKey, errors)).toEqual(expectedResult);
    });
  });

  describe('clearFormErrors', () => {
    it('should return clearFormErrors action', () => {
      const expectedResult = {
        type: CLEAR_FORM_ERRORS,
        formKey,
      };
      expect(clearFormErrors(formKey)).toEqual(expectedResult);
    });
  });

  describe('submitForm', () => {
    it('should return submitForm action', () => {
      const expectedResult = {
        type: SUBMIT_FORM,
        formKey,
        endpoint,
        data,
        onSuccess,
        onError,
      };
      expect(submitForm(formKey, endpoint, data, onSuccess, onError)).toEqual(
        expectedResult,
      );
    });
  });

  describe('submitFormError', () => {
    it('should return submitFormError action', () => {
      const expectedResult = {
        type: SUBMIT_FORM_ERROR,
        formKey,
        error,
      };
      expect(submitFormError(formKey, error)).toEqual(expectedResult);
    });
  });

  describe('submitFormSuccess', () => {
    it('should return submitFormSuccess action', () => {
      const expectedResult = {
        type: SUBMIT_FORM_SUCCESS,
        formKey,
        response,
      };
      expect(submitFormSuccess(formKey, response)).toEqual(expectedResult);
    });
  });

  describe('cancelSubmitForm', () => {
    it('should return cancelSubmitForm action', () => {
      const expectedResult = {
        type: CANCEL_SUBMIT_FORM,
        formKey,
      };
      expect(cancelSubmitForm(formKey)).toEqual(expectedResult);
    });
  });
});

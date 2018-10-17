/**
 * Form Actions
 */

import {
  INITIALIZE_FORM,
  SET_FORM_FIELD_ERRORS,
  SET_FORM_FIELD_VALUE,
  SUBMIT_FORM,
  SUBMIT_FORM_ERROR,
  SUBMIT_FORM_SUCCESS,
  CLEAR_FORM_ERRORS,
  CANCEL_SUBMIT_FORM,
} from './constants';

/**
 * Sets the value of the form field
 *
 * @param {formKey} form key
 * @param {formField} form field
 * @param {value} new value
 */
export function setFormFieldValue(formKey, formField, value) {
  return {
    type: SET_FORM_FIELD_VALUE,
    formKey,
    formField,
    value,
  };
}

export function setFormFieldErrors(formKey, errors) {
  return {
    type: SET_FORM_FIELD_ERRORS,
    formKey,
    errors,
  };
}

export function clearFormErrors(formKey) {
  return {
    type: CLEAR_FORM_ERRORS,
    formKey,
  };
}

export function initializeForm(formKey, fields) {
  return {
    type: INITIALIZE_FORM,
    formKey,
    fields,
  };
}

export function submitForm(formKey, endpoint, data, onSuccess, onError) {
  return {
    type: SUBMIT_FORM,
    formKey,
    endpoint,
    data,
    onSuccess,
    onError,
  };
}

export function submitFormError(formKey, error) {
  return {
    type: SUBMIT_FORM_ERROR,
    formKey,
    error,
  };
}

export function submitFormSuccess(formKey, response) {
  return {
    type: SUBMIT_FORM_SUCCESS,
    formKey,
    response,
  };
}

export function cancelSubmitForm(formKey) {
  return {
    type: CANCEL_SUBMIT_FORM,
    formKey,
  };
}

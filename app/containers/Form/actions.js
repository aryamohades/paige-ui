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

/**
 * Sets the form field errors
 *
 * @param {formKey} form key
 * @param {errors} form field errors
 */
export function setFormFieldErrors(formKey, errors) {
  return {
    type: SET_FORM_FIELD_ERRORS,
    formKey,
    errors,
  };
}

/**
 * Clear the form field errors
 *
 * @param {formKey} form key
 */
export function clearFormErrors(formKey) {
  return {
    type: CLEAR_FORM_ERRORS,
    formKey,
  };
}

/**
 * Initialize the form with form field configuration
 *
 * @param {formKey} form key
 * @param {fields} form fields config
 */
export function initializeForm(formKey, fields) {
  return {
    type: INITIALIZE_FORM,
    formKey,
    fields,
  };
}

/**
 * Submit the form, calling the remote endpoint with form data and
 * dispatching optional onSuccess or onError actions
 *
 * @param {formKey} form key
 * @param {endpoint} the remote endpoint
 * @param {data} the form data
 * @param {onSuccess} string name of success action type
 * @param {onError} string name of error action type
 */
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

/**
 * Set the form error after unsuccessful form submit
 *
 * @param {formKey} form key
 * @param {error} the error message
 */
export function submitFormError(formKey, error) {
  return {
    type: SUBMIT_FORM_ERROR,
    formKey,
    error,
  };
}

/**
 * Set the response data after successful form submit
 *
 * @param {formKey} form key
 * @param {response} response data
 */
export function submitFormSuccess(formKey, response) {
  return {
    type: SUBMIT_FORM_SUCCESS,
    formKey,
    response,
  };
}

/**
 * Cancel the form submit, will cancel async submit task with redux-saga
 *
 * @param {formKey} form key
 */
export function cancelSubmitForm(formKey) {
  return {
    type: CANCEL_SUBMIT_FORM,
    formKey,
  };
}

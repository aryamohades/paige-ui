/**
 * Form Actions
 */

import {
  INITIALIZE_FORM,
  SET_FORM_FIELD_ERRORS,
  SET_FORM_FIELD_VALUE,
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

export function initializeForm(formKey, fields) {
  return {
    type: INITIALIZE_FORM,
    formKey,
    fields,
  };
}

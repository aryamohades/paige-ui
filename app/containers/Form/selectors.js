/**
 * The form state selectors
 */

import { createSelector } from 'reselect';

import {
  ERRORS_REDUCER_KEY,
  SUBMITTING_REDUCER_KEY,
  VALUES_REDUCER_KEY,
} from './constants';

const selectForm = state => state.get('form');

const makeSelectFormFieldValues = formKey =>
  createSelector(selectForm, formState =>
    formState.getIn([formKey, VALUES_REDUCER_KEY]),
  );

const makeSelectFormFieldValue = (formKey, formField) =>
  createSelector(selectForm, formState =>
    formState.getIn([formKey, VALUES_REDUCER_KEY, formField]),
  );

const makeSelectFormFieldError = (formKey, formField) =>
  createSelector(selectForm, formState =>
    formState.getIn([formKey, ERRORS_REDUCER_KEY, formField]),
  );

const makeSelectIsFormSubmitting = formKey =>
  createSelector(selectForm, formState =>
    formState.getIn([formKey, SUBMITTING_REDUCER_KEY]),
  );

export {
  selectForm,
  makeSelectFormFieldValues,
  makeSelectFormFieldValue,
  makeSelectFormFieldError,
  makeSelectIsFormSubmitting,
};

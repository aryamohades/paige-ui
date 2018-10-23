import { take, put, call, fork, cancel } from 'redux-saga/effects';

import request from 'utils/request';
import { submitFormError, submitFormSuccess } from './actions';
import {
  CANCEL_SUBMIT_FORM,
  SUBMIT_FORM_ERROR,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM,
} from './constants';

/**
 * Form submit request/response handler
 */
export function* submit(formKey, endpoint, data, onSuccess, onError) {
  try {
    // Wait for the submit form api call to complete
    const response = yield call(request, endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // If request is successful, dispatch the submit success action
    // with the response data
    yield put(submitFormSuccess(formKey, response));

    // If onSuccess action type is provided, dispatch it
    // with the response data
    if (onSuccess) {
      yield put({ type: onSuccess, response });
    }
  } catch (error) {
    // If request errors, dispatch the submit error action
    // with the error
    yield put(submitFormError(formKey, error));

    // If onError action type is provided, dispatch it
    // with the error
    if (onError) {
      yield put({ type: onError, error });
    }
  }
}

/**
 * Submit form flow
 */
export default function* submitFlow() {
  while (true) {
    // Wait for a submit form request
    const { formKey, endpoint, data, onSuccess, onError } = yield take(
      SUBMIT_FORM,
    );

    // Fork a task to make the submit request api call
    const task = yield fork(
      submit,
      formKey,
      endpoint,
      data,
      onSuccess,
      onError,
    );

    // Wait for one of cancel submit, submit success, or submit error actions
    const action = yield take([
      CANCEL_SUBMIT_FORM,
      SUBMIT_FORM_SUCCESS,
      SUBMIT_FORM_ERROR,
    ]);

    // If action type is cancel submit, then cancel the submit task
    if (action.type === CANCEL_SUBMIT_FORM) {
      yield cancel(task);
    }
  }
}

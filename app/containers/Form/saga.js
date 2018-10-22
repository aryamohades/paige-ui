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
    const response = yield call(request, endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    yield put(submitFormSuccess(formKey, response));

    if (onSuccess) {
      yield put({ type: onSuccess, response });
    }
  } catch (error) {
    yield put(submitFormError(formKey, error));

    if (onError) {
      yield put({ type: onError, error });
    }
  }
}

export default function* submitFlow() {
  while (true) {
    const { formKey, endpoint, data, onSuccess, onError } = yield take(
      SUBMIT_FORM,
    );

    const task = yield fork(
      submit,
      formKey,
      endpoint,
      data,
      onSuccess,
      onError,
    );

    const action = yield take([
      CANCEL_SUBMIT_FORM,
      SUBMIT_FORM_SUCCESS,
      SUBMIT_FORM_ERROR,
    ]);

    if (action.type === CANCEL_SUBMIT_FORM) {
      yield cancel(task);
    }
  }
}

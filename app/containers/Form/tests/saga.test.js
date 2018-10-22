/**
 * Tests for Form sagas
 */

import { put, take, fork, cancel } from 'redux-saga/effects';
import { cloneableGenerator, createMockTask } from 'redux-saga/utils';

import submitFlow, { submit } from '../saga';
import {
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR,
  CANCEL_SUBMIT_FORM,
} from '../constants';

const testFormKey = 'test';
const testEndpoint = 'test';
const testData = { message: 'hello' };
const testResponse = { message: 'hello' };
const testOnSuccess = 'ON_SUCCESS';
const testOnError = 'ON_ERROR';
const testError = new Error('Some error');

const mockSubmitSuccessAction = {
  type: SUBMIT_FORM_SUCCESS,
  formKey: testFormKey,
  response: testResponse,
};

const mockSubmitErrorAction = {
  type: SUBMIT_FORM_ERROR,
  formKey: testFormKey,
  error: testError,
};

const mockOnSuccessAction = {
  type: testOnSuccess,
  response: testResponse,
};

const mockOnErrorAction = {
  type: testOnError,
  error: testError,
};

describe('submit Saga', () => {
  let gen;

  beforeEach(() => {
    gen = submit(
      testFormKey,
      testEndpoint,
      testData,
      testOnSuccess,
      testOnError,
    );

    expect(gen.next().value).toMatchSnapshot();
  });

  it('should dispatch the submitFormSuccess action if request is successful', () => {
    const expectedYield = put(mockSubmitSuccessAction);
    expect(gen.next(testResponse).value).toEqual(expectedYield);
  });

  it('should call the submitFormError action if the request errors', () => {
    const expectedYield = put(mockSubmitErrorAction);
    expect(gen.throw(testError).value).toEqual(expectedYield);
  });

  it('should call onSuccess action if request is successful', () => {
    gen.next(testResponse);
    const expectedYield = put(mockOnSuccessAction);
    expect(gen.next().value).toEqual(expectedYield);
  });

  it('should call onError action if request errors', () => {
    gen.throw(testError);
    const expectedYield = put(mockOnErrorAction);
    expect(gen.next().value).toEqual(expectedYield);
  });

  it('should not dispatch onSuccess if no onSuccess action type is passed', () => {
    const genNoOnSuccess = submit(testFormKey, testEndpoint, testData);
    genNoOnSuccess.next();
    genNoOnSuccess.next(testResponse);
    expect(genNoOnSuccess.next().done).toEqual(true);
  });

  it('should not dispatch onError if no onError action type is passed', () => {
    const genNoOnError = submit(testFormKey, testEndpoint, testData);
    genNoOnError.next();
    genNoOnError.throw(testError);
    expect(genNoOnError.next().done).toEqual(true);
  });
});

describe('submitFlow Saga', () => {
  const gen = cloneableGenerator(submitFlow)();
  const mockTask = createMockTask();

  it('should start task to watch for SUBMIT_FORM action', () => {
    const expectedYield = take(SUBMIT_FORM);
    expect(gen.next().value).toEqual(expectedYield);
  });

  it('should fork task to submit form', () => {
    const expectedYield = fork(
      submit,
      testFormKey,
      testEndpoint,
      testData,
      testOnSuccess,
      testOnError,
    );

    const mockedAction = {
      type: SUBMIT_FORM,
      formKey: testFormKey,
      endpoint: testEndpoint,
      data: testData,
      onSuccess: testOnSuccess,
      onError: testOnError,
    };

    expect(gen.next(mockedAction).value).toEqual(expectedYield);
  });

  it('should start task to watch for SUBMIT_FORM_SUCCESS, SUBMIT_FORM_ERROR, or CANCEL_SUBMIT_FORM action', () => {
    const expectedYield = take([
      CANCEL_SUBMIT_FORM,
      SUBMIT_FORM_SUCCESS,
      SUBMIT_FORM_ERROR,
    ]);

    expect(gen.next(mockTask).value).toEqual(expectedYield);
  });

  it('should wait for CANCEL_SUBMIT_FORM action and cancel the submit task', () => {
    const clone = gen.clone();
    const expectedYield = cancel(mockTask);
    const mockCancelAction = { type: CANCEL_SUBMIT_FORM };
    expect(clone.next(mockCancelAction).value).toEqual(expectedYield);
  });

  it('should wait for SUBMIT_FORM_SUCCESS action and restart saga', () => {
    const clone = gen.clone();
    const expectedYield = take(SUBMIT_FORM);
    const mockSuccessAction = { type: SUBMIT_FORM_SUCCESS };
    expect(clone.next(mockSuccessAction).value).toEqual(expectedYield);
  });
});

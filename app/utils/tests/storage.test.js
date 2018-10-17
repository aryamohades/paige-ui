import { LOGIN_SUCCESS } from 'containers/App/constants';
import {
  localStorageMiddleware,
  setItemInStorage,
  getItemFromStorage,
  setObjectInStorage,
  getObjectFromStorage,
  removeFromStorage,
} from '../storage';

describe('LocalStorageMiddleware', () => {
  beforeEach(() => {
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    localStorage.removeItem.mockClear();
  });

  it('sets username and token in localStorage on LOGIN_SUCCESS', () => {
    const username = 'test';
    const token = '12345';

    localStorageMiddleware()(action => action)({
      type: LOGIN_SUCCESS,
      response: {
        username,
        token,
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
    expect(localStorage.setItem).toHaveBeenCalledWith('username', username);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });

  it('does not call local storage if action type is not LOGIN_SUCCESS', () => {
    localStorageMiddleware()(action => action)({
      type: 'random',
    });

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});

describe('storage', () => {
  beforeEach(() => {
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    localStorage.removeItem.mockClear();
  });

  it('sets item in local storage', () => {
    const testKey = 'testKey';
    const testValue = 'testValue';
    setItemInStorage(testKey, testValue);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(testKey, testValue);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('gets item from local storage', () => {
    const testKey = 'testKey';
    getItemFromStorage(testKey);
    expect(localStorage.getItem).toHaveBeenLastCalledWith(testKey);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('sets object in local storage', () => {
    const testKey = 'testKey';
    const testValue = { test: 'test' };
    setObjectInStorage(testKey, testValue);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      testKey,
      JSON.stringify(testValue),
    );
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('gets object from local storage', () => {
    const testKey = 'testKey';
    getObjectFromStorage(testKey);
    expect(localStorage.getItem).toHaveBeenLastCalledWith(testKey);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('removes from local storage', () => {
    const testKey = 'testKey';
    removeFromStorage(testKey);
    expect(localStorage.removeItem).toHaveBeenLastCalledWith(testKey);
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
  });

  it('handles invalid object', () => {
    const testKey = 'testKey';
    const testValue = 'test';
    setItemInStorage(testKey, testValue);
    expect(getObjectFromStorage(testKey)).toEqual(null);
  });
});

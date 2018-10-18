import { fromJS } from 'immutable';

import { validateFields, notEmpty, isEmail } from '../validators';

describe('notEmpty', () => {
  const field = 'test';
  const testValueNotEmpty = 'test';
  const testValueEmpty = '';
  const validator = notEmpty(field);

  it('should not throw an error if value is not empty', () => {
    expect(validator(testValueNotEmpty)).toBeUndefined();
  });

  it('should throw an error if value is empty', () => {
    expect(() => validator(testValueEmpty)).toThrow(field);
  });
});

describe('isEmail', () => {
  const testValueValid = 'test@test.com';
  const testValueInvalid = 'test';

  it('should not throw an error if value is valid email', () => {
    expect(isEmail(testValueValid)).toBeUndefined();
  });

  it('should throw an error if value is not valid email', () => {
    expect(() => isEmail(testValueInvalid)).toThrow();
  });
});

describe('validateFields', () => {
  const emailField = 'email';
  const usernameField = 'username';
  const fields = {
    username: {
      type: String,
      validate: notEmpty(usernameField),
    },
    email: {
      type: String,
      validate: [notEmpty(emailField), isEmail],
    },
  };
  const noValidateFields = {
    text: {
      type: String,
    },
    random: {
      type: String,
    },
  };

  const invalidValues = fromJS({ [usernameField]: '', [emailField]: 'test' });
  const validValues = fromJS({
    [usernameField]: 'test',
    [emailField]: 'test@test.com',
  });
  const noValidateValues = fromJS({ text: '', random: '' });
  const expectedResult = fromJS({
    [usernameField]: `${usernameField} cannot be empty`,
    [emailField]: 'Must be a valid email address',
  });

  it('should return an error if fields are invalid', () => {
    expect(validateFields(fields, invalidValues)).toEqual(expectedResult);
  });

  it('should not return an error if fields are valid', () => {
    expect(validateFields(fields, validValues)).toEqual(null);
  });

  it('should not return an error if no validation is specified', () => {
    expect(validateFields(noValidateFields, noValidateValues)).toEqual(null);
  });
});

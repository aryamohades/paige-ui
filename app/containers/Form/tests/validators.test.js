import { notEmpty, isEmail } from '../validators';

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

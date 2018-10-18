import validator from 'validator';
import { fromJS } from 'immutable';

export const validateFields = (fields, values) => {
  let isValid = true;
  const errors = {};

  Object.keys(fields).forEach(field => {
    if (fields[field].validate) {
      try {
        if (Array.isArray(fields[field].validate)) {
          fields[field].validate.forEach(v => {
            v(values.get(field));
          });
        } else {
          fields[field].validate(values.get(field));
        }
      } catch (e) {
        errors[field] = e.message;
        isValid = false;
      }
    }
  });

  return isValid ? null : fromJS(errors);
};

export const notEmpty = field => val => {
  if (validator.isEmpty(val)) {
    throw new Error(`${field} cannot be empty`);
  }
};

export const isEmail = val => {
  if (!validator.isEmail(val)) {
    throw new Error('Must be a valid email address');
  }
};

import validator from 'validator';

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

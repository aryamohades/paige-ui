import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectFormFieldValue,
  makeSelectFormFieldError,
} from 'containers/Form/selectors';
import { setFormFieldValue } from 'containers/Form/actions';
import FormFieldError from 'components/FormFieldError';
import Input from './Input';

export const TextField = ({
  error,
  id,
  label,
  onInput,
  placeholder,
  type,
  value,
}) => (
  <div>
    {label && <label htmlFor={id}>{label}</label>}
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onInput}
    />
    {error && <FormFieldError>{error}</FormFieldError>}
  </div>
);

TextField.propTypes = {
  error: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onInput: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password']),
  value: PropTypes.string,
};

TextField.defaultProps = {
  error: '',
  type: 'text',
  value: '',
};

/* istanbul ignore next */
const mapStateToProps = (state, { formKey, formField }) =>
  createStructuredSelector({
    value: makeSelectFormFieldValue(formKey, formField),
    error: makeSelectFormFieldError(formKey, formField),
  });

/* istanbul ignore next */
const mapDispatchToProps = (dispatch, { formKey, formField, onChange }) => ({
  onInput: evt => {
    dispatch(setFormFieldValue(formKey, formField, evt.target.value));

    if (onChange) {
      onChange(evt.target.value);
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TextField);

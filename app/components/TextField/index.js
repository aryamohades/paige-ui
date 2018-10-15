import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import {
  makeSelectFormFieldValue,
  makeSelectFormFieldError,
} from 'containers/Form/selectors';
import { setFormFieldValue } from 'containers/Form/actions';
import FormFieldError from 'components/FormFieldError';
import Input from './Input';

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const TextField = ({ error, id, label, onInput, placeholder, type, value }) => (
  <InputContainer>
    {label && <label htmlFor={id}>{label}</label>}
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onInput}
    />
    {error && <FormFieldError error={error} />}
  </InputContainer>
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

const mapStateToProps = (state, { formKey, formField }) =>
  createStructuredSelector({
    value: makeSelectFormFieldValue(formKey, formField),
    error: makeSelectFormFieldError(formKey, formField),
  });

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

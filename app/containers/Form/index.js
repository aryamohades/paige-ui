import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fromJS } from 'immutable';

import {
  clearFormErrors,
  initializeForm,
  setFormFieldErrors,
  submitForm,
} from './actions';
import { makeSelectFormFieldValues } from './selectors';

const validateFields = (fields, values) => {
  let isValid = true;
  const errors = {};

  Object.keys(fields).forEach(field => {
    if (fields[field].validate) {
      try {
        if (Array.isArray(fields[field].validate)) {
          fields[field].validate.forEach(v => {
            if (fields[field].sendAs) {
              v(values.get(fields[field].sendAs));
            } else {
              v(values.get(field));
            }
          });
        } else if (fields[field].sendAs) {
          fields[field].validate(values.get(fields[field].sendAs));
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

const createForm = (
  WrappedComponent,
  { endpoint, fields, formKey, onError, onSuccess },
) => {
  class Component extends React.PureComponent {
    constructor(props) {
      super();
      const { init } = props;
      init(formKey, fields);
    }

    render() {
      return (
        <form onSubmit={this.onSubmitForm}>
          <WrappedComponent {...this.props} />
        </form>
      );
    }

    onSubmitForm = evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();

      const { clearErrors, error, submit, values } = this.props;

      const errors = validateFields(fields, values);

      if (errors) {
        error(errors);
      } else {
        clearErrors();
        submit(values);
      }
    };
  }

  Component.propTypes = {
    clearErrors: PropTypes.func,
    error: PropTypes.func,
    init: PropTypes.func,
    submit: PropTypes.func,
    values: PropTypes.object,
  };

  const mapStateToProps = createStructuredSelector({
    values: makeSelectFormFieldValues(formKey),
  });

  const mapDispatchToProps = dispatch => ({
    clearErrors: () => dispatch(clearFormErrors(formKey)),
    init: () => dispatch(initializeForm(formKey, fields)),
    error: errors => dispatch(setFormFieldErrors(formKey, errors)),
    submit: data =>
      dispatch(submitForm(formKey, endpoint, data, onSuccess, onError)),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Component);
};

export default createForm;

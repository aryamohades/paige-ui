import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fromJS } from 'immutable';

import { initializeForm, setFormFieldErrors } from './actions';
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

const createForm = (WrappedComponent, { fields, formKey }) => {
  class Component extends React.PureComponent {
    componentWillMount() {
      const { init } = this.props;

      init(formKey, fields);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  Component.propTypes = {
    error: PropTypes.func,
    init: PropTypes.func,
    values: PropTypes.object,
  };

  const mapStateToProps = createStructuredSelector({
    values: makeSelectFormFieldValues(formKey),
  });

  const mapDispatchToProps = dispatch => ({
    init: () => dispatch(initializeForm(formKey, fields)),
    error: errors => dispatch(setFormFieldErrors(formKey, errors)),
    submit: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    },
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Component);
};

export default createForm;

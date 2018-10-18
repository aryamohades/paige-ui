import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  clearFormErrors,
  initializeForm,
  setFormFieldErrors,
  submitForm,
} from './actions';
import { makeSelectFormFieldValues } from './selectors';
import { validateFields } from './validators';

const createForm = (
  WrappedComponent,
  { connected = true, endpoint, fields, formKey, onError, onSuccess },
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
      /* istanbul ignore next */
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

  if (!connected) {
    return Component;
  }

  /* istanbul ignore next */
  const mapStateToProps = createStructuredSelector({
    values: makeSelectFormFieldValues(formKey),
  });

  /* istanbul ignore next */
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

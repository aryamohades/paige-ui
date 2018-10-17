import React from 'react';
import PropTypes from 'prop-types';

import createForm from 'containers/Form';
import TextField from 'components/TextField';
import SubmitButton from 'components/SubmitButton';
import { notEmpty } from 'containers/Form/validators';
import { LOGIN_SUCCESS } from 'containers/App/constants';
import { API_LOGIN } from './constants';

export const LoginPage = ({ location }) => {
  // @TODO: use isAuthenticated to determine whether to redirect using <Redirect /> component
  /* istanbul ignore next */
  const { from } = location.state || { from: { pathname: '/' } }; // eslint-disable-line no-unused-vars

  const usernameProps = {
    id: 'login-username-textfield',
    formKey: 'login',
    formField: 'username',
    label: 'Username',
  };

  const passwordProps = {
    id: 'login-password-textfield',
    formKey: 'login',
    formField: 'password',
    label: 'Password',
    type: 'password',
  };

  return (
    <div>
      <h3>Login</h3>
      <TextField {...usernameProps} />
      <TextField {...passwordProps} />
      <SubmitButton>Login</SubmitButton>
    </div>
  );
};

LoginPage.propTypes = {
  location: PropTypes.object,
};

export default createForm(LoginPage, {
  endpoint: API_LOGIN,
  onSuccess: LOGIN_SUCCESS,
  formKey: 'login',
  fields: {
    username: {
      type: String,
      validate: notEmpty('Username'),
    },
    password: {
      type: String,
      validate: notEmpty('Password'),
    },
  },
});

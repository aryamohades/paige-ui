import React from 'react';

import createForm from 'containers/Form';
import TextField from 'components/TextField';
import { notEmpty } from 'containers/Form/validators';
import { API_LOGIN } from './constants';

const LoginPage = ({ location }) => {
  const { from } = location.state || { from: { pathname: '/' } };

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
    </div>
  );
};

export default createForm(LoginPage, {
  submit: API_LOGIN,
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

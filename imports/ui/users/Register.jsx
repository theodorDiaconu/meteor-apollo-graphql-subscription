import React from 'react';
import Accounts from 'meteor/accounts-base';
import { AutoForm, AutoField, ErrorField } from 'uniforms-unstyled';
import SimpleSchema from 'simpl-schema';
import Notifier from '/imports/client/lib/Notifier';

class Register extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  onSubmit = data => {
    const { firstName, lastName, email, password } = data;

    Accounts.createUser(
      {
        email,
        password,
        profile: { firstName, lastName }
      },
      err => {
        if (!err) {
          Notifier.success('Welcome !');
        } else {
          this.setState({
            error: err.reason
          });
        }
      }
    );
  };

  render() {
    const { error } = this.state;
    return (
      <AutoForm schema={RegisterSchema} onSubmit={this.onSubmit}>
        {error && <div className="error">{error}</div>}

        <AutoField name="firstName" />
        <ErrorField name="firstName" />

        <AutoField name="lastName" />
        <ErrorField name="lastName" />

        <AutoField name="email" />
        <ErrorField name="email" />

        <AutoField name="password" type="password" />
        <ErrorField name="password" />

        <AutoField name="confirm_password" type="password" />
        <ErrorField name="confirm_password" />

        <button type="submit">Register</button>
      </AutoForm>
    );
  }
}

const RegisterSchema = new SimpleSchema({
  firstName: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  password: { type: String },
  confirm_password: {
    type: String,
    custom() {
      if (this.value != this.field('password').value) {
        return 'passwordMismatch';
      }
    }
  }
});

export default Register;

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import Subscription from './Subscription';

export const App = () => (
  <div className="App">
    <h1>Hello</h1>
    <ul>
      <UserListWithData />
      <UpdateButtonContainer name="John Smith" />
      <Subscription />
    </ul>
  </div>
);

const UpdateButton = ({ mutate }) => {
  return (
    <button
      onClick={() => {
        mutate({ name: 'John' }).then(result => {
          console.log(result);
        });
      }}
    >
      Update My Name
    </button>
  );
};

const UserList = ({ data: { userList, loading, error } }) => {
  if (loading) {
    return null;
  }

  return userList.map((user, idx) => (
    <li key={idx}>
      {user.firstName} {user.lastName}
    </li>
  ));
};

const GET_USER_LIST = gql`
  query {
    userList {
      firstName
      lastName
    }
  }
`;

const UPDATE_USER_NAME = gql`
  mutation update($name: String!) {
    updateUserName(name: $name)
  }
`;

const UserListWithData = graphql(GET_USER_LIST)(UserList);
const UpdateButtonContainer = graphql(UPDATE_USER_NAME)(UpdateButton);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Subscription extends Component {
  componentDidMount = () => {
    this.props.subscribe();
  };

  render() {
    const { data: { error, userList, loading } } = this.props;
    if (loading) {
      return null;
    }

    return (
      <ul>
        {userList.map((user, idx) => (
          <li key={idx}>
            {user.firstName} - {user.lastName}
          </li>
        ))}
      </ul>
    );
  }
}

const SUBSCRIBE_USER_LIST = gql`
  subscription {
    userList {
      firstName
    }
  }
`;

const GET_USER_LIST = gql`
  query userListReactive {
    userList {
      firstName
      lastName
    }
  }
`;

export default graphql(GET_USER_LIST, {
  props: props => {
    return {
      ...props,
      subscribe: params => {
        return props.data.subscribeToMore({
          document: SUBSCRIBE_USER_LIST,
          updateQuery: (prev, props) => {
            console.log(props, prev);
            const { subscriptionData } = props;
            if (!subscriptionData.firstName) {
              return prev;
            }

            const entry = {
              ...subscriptionData.data.userList,
              __typename: 'User'
            };

            return Object.assign({}, prev, {
              userList: [...prev.userList, entry]
            });
          }
        });
      }
    };
  }
})(Subscription);

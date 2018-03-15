import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Subscription extends Component {
  componentDidMount = () => {
    this.props.subscribe();
  };

  render() {
    const { data: { error, items, loading } } = this.props;
    if (loading) {
      return null;
    }

    return (
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item._id} ### {item.text}
          </li>
        ))}
      </ul>
    );
  }
}

const SUBSCRIBE_ITEMS = gql`
  subscription {
    items {
      type
      _id
      doc
    }
  }
`;

const GET_ITEMS = gql`
  query items {
    items {
      _id
      text
    }
  }
`;

export default graphql(GET_ITEMS, {
  props: props => {
    return {
      ...props,
      subscribe: createSubscribe(props.data.subscribeToMore, {
        subscription: SUBSCRIBE_ITEMS,
        subscriptionName: 'items',
        queryName: 'items',
        __typename: 'Item'
      })
    };
  }
})(Subscription);

function createSubscribe(
  subscribeToMore,
  { subscriptionName, subscription, queryName, __typename }
) {
  return params => {
    return subscribeToMore({
      document: subscription,
      updateQuery: (prev, props) => {
        const reactiveEvent = props.subscriptionData.data[subscriptionName];

        return updateReactiveEvent(reactiveEvent, prev, queryName, __typename);
      }
    });
  };
}

function updateReactiveEvent(event, state, queryName, __typename) {
  console.log(event);
  const { type, doc, _id } = event;

  if (type === 'added') {
    const entry = {
      _id,
      ...doc,
      __typename
    };

    const newData = [entry, ...state[queryName]];

    return Object.assign({}, state, {
      [queryName]: state[queryName].concat(entry)
    });
  }

  if (type === 'changed') {
    let foundIdx;
    const found = state[queryName].find((item, idx) => {
      if (item._id === _id) {
        foundIdx = idx;
        return true;
      }
    });

    const newFound = Object.assign({}, found, doc);

    const data = [
      ...state[queryName].slice(0, foundIdx),
      newFound,
      ...state[queryName].slice(foundIdx + 1)
    ];

    return Object.assign({}, state, {
      [queryName]: data
    });
  }

  if (type === 'removed') {
    return Object.assign({}, state, {
      [queryName]: state[queryName].filter(item => item._id !== _id)
    });
  }
}

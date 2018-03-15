import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';
import { client } from './apollo';
import { ApolloProvider } from 'react-apollo';
import { App } from '../../imports/ui/App';

Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('app')
  );
});

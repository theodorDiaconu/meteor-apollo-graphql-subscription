import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';

import ApolloClient from 'apollo-client';
import { createApolloClient } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';

import { App } from '/imports/ui/App';

const client = new ApolloClient(createApolloClient({}));

Meteor.startup(() => {
    render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>,
        document.getElementById('app')
    );
});

import { SubscriptionClient } from 'subscriptions-transport-ws';
import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split, concat, ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { meteorAccountsLink } from 'meteor/apollo';

const GRAPHQL_ENDPOINT = 'ws://localhost:3000/subs';

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3000/subs`,
  options: {
    reconnect: true,
    connectionParams: () => ({
      // getMeteorLoginToken = get the Meteor current user login token from local storage
      'meteor-login-token': localStorage.getItem('Meteor.loginToken')
    })
  }
});

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql'
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  concat(meteorAccountsLink, httpLink)
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

// apolloClient.use([
//   {
//     async applyMiddleware(req, next) {
//       if (req.options) {
//         if (!req.options.headers) {
//           req.options.headers = {}; // Create the header object if needed.
//         }
//         const authenticationToken = await localStorage.getItem(
//           'Meteor.loginToken'
//         );
//         req.options.headers['meteor-login-token'] = authenticationToken;
//         next();
//       }
//     }
//   }
// ]);

export default apolloClient;

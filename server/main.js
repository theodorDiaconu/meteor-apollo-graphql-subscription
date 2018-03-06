import { WebApp } from 'meteor/webapp';
import { execute, subscribe } from 'graphql';
import { createApolloServer } from 'meteor/apollo';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import typeDefs from '/imports/api/schema';
import { resolvers } from '/imports/api/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

createApolloServer(
  {
    schema
  },
  {
    graphiqlOptions: {
      subscriptionsEndpoint: `ws://127.0.0.1:3000/subscriptions`
    }
  }
);

new SubscriptionServer(
  {
    schema,
    execute,
    subscribe
  },
  {
    server: WebApp.httpServer,
    path: '/subscriptions'
  }
);

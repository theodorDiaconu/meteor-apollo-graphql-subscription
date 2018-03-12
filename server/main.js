import { WebApp } from 'meteor/webapp';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { SubscriptionManager } from 'graphql-subscriptions';
import { createApolloServer, addCurrentUserToContext } from 'meteor/apollo';
import pubsub from '../imports/api/pubsub';

import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mergeSchemas
} from 'graphql-tools';

import { Mutation, Query, Subscription } from '/imports/api/typeDefs';
import { resolvers } from '/imports/api/resolvers';

const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, Subscription],
  resolvers
});

// any additional context you use for your resolvers, if any
const context = {};

// subscriptions path which fits witht the one you connect to on the client
const subscriptionsPath = '/subs';

// start a graphql server with Express handling a possible Meteor current user
createApolloServer(
  {
    schema,
    context
  },
  {
    graphiqlOptions: {
      subscriptionsEndpoint: Meteor.absoluteUrl(subscriptionsPath).replace(
        /http(s)?/,
        'ws'
      )
    }
  }
);

// start up a subscription server
new SubscriptionServer(
  {
    schema,
    execute,
    subscribe,
    // on connect subscription lifecycle event
    onConnect: async (connectionParams, webSocket) => {
      // if a meteor login token is passed to the connection params from the client,
      // add the current user to the subscription context
      const subscriptionContext = connectionParams.meteorLoginToken
        ? await addCurrentUserToContext(
            context,
            connectionParams.meteorLoginToken
          )
        : context;

      return subscriptionContext;
    }
  },
  {
    // bind the subscription server to Meteor WebApp
    server: WebApp.httpServer,
    path: subscriptionsPath
  }
);

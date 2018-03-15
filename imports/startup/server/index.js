import { WebApp } from 'meteor/webapp';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { SubscriptionManager } from 'graphql-subscriptions';
import { createApolloServer, addCurrentUserToContext } from 'meteor/apollo';
import pubsub from '/imports/api/pubsub';

import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mergeSchemas
} from 'graphql-tools';

import './apollo';

import schema from './schema';
import { GRAPHQL_SUBSCRIPTION_ENDPOINT } from '../../constants';
import { createApolloServer } from 'meteor/apollo';

createApolloServer(
  {
    schema
  },
  {
    graphiqlOptions: {
      subscriptionsEndpoint: GRAPHQL_SUBSCRIPTION_ENDPOINT
    }
  }
);

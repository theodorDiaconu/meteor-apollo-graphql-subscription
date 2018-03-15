import schema from '/imports/api/graphql';
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

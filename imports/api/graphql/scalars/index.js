import Scalars from './scalars';
import DateResolver from './Date';
import GraphQLJSON from 'graphql-type-json';

const typeDefs = [Scalars];
const resolvers = [
  {
    Date: DateResolver,
    JSON: GraphQLJSON
  }
];

export { typeDefs, resolvers };

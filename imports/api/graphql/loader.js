import { makeExecutableSchema, mergeSchemas } from 'graphql-tools';
import { mergeTypes, mergeResolvers, fileLoader } from 'merge-graphql-schemas';

export default function load(array) {
  let typeDefsCollection = [];
  let resolversCollection = [];

  array.forEach(module => {
    const { typeDefs, resolvers } = module;
    if (resolvers) {
      if (_.isArray(resolvers)) {
        resolversCollection.push(...resolvers);
      } else {
        resolversCollection.push(resolvers);
      }
    }
    if (typeDefs) {
      if (_.isArray(typeDefs)) {
        typeDefsCollection.push(...typeDefs);
      } else {
        typeDefsCollection.push(typeDefs);
      }
    }
  });

  const typeDefs = mergeTypes(typeDefsCollection);
  const resolvers = mergeResolvers(resolversCollection);

  return makeExecutableSchema({
    typeDefs,
    resolvers
  });
}

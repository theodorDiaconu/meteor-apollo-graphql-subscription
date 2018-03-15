import Users from './users.gql';
import UsersResolvers from './users.resolvers';
import Comments from './comments.gql';
import CommentsResolvers from './comments.resolvers';

const resolvers = [UsersResolvers, CommentsResolvers];
const typeDefs = [Users, Comments];

export { typeDefs, resolvers };

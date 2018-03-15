import CommentType from './Comment';
import CommentResolver from './Comment.resolver';
import UserType from './User';
import UserResolver from './User.resolver';

const typeDefs = [UserType, CommentType];
const resolvers = [UserResolver, CommentResolver];

export { typeDefs, resolvers };

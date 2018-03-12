import db from './db';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
// import buildGraph from "./buildGraph";
import { pubsub } from './pubsub';
import GraphQLJSON from 'graphql-type-json';

export const resolvers = {
  Query: {
    say(root, args, context) {
      return 'hello world';
    },
    userList(root, args, context, ast) {
      const { name } = args;

      // console.log(buildGraph(ast));

      if (!name) {
        return db.getUsers();
      } else {
        return db.getUsers().filter(user => user.firstName === name);
      }
    }
  },

  Mutation: {
    updateUserName(root, args) {
      console.log(args);

      return 'ok';
    }
  },

  Subscription: {
    somethingChanged: {
      resolve: payload => {
        return payload;
      },
      subscribe: (...args) => {
        console.log('subbing');
        return pubsub.asyncIterator('somethingChanged');
      },
      unsubscribe: () => {
        console.log('unsub');
      }
    },
    userList: {
      resolve: payload => payload,
      subscribe: (...args) => {
        console.log('subbing userList');
        return pubsub.asyncIterator('userList');
      }
    }
  },

  User: {
    comments(root, args, context) {
      if (root.todos) {
        return todos;
      }

      return db.generateTodos(root.firstName);
    }
  },

  Comment: {
    username() {
      return 'John Smith';
    }
  },

  JSON: GraphQLJSON,

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  })
};

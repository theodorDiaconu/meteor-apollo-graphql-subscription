import db from './db';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
// import buildGraph from "./buildGraph";
import { pubsub } from './pubsub';
import GraphQLJSON from 'graphql-type-json';
import { Items } from '/imports/db';

console.log('here');

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
    },
    items() {
      return Items.find().fetch();
    }
  },

  Mutation: {
    updateUserName(root, args, context) {
      console.log(context);

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
    items: {
      resolve: payload => payload,
      subscribe: (root, args, context) => {
        console.log('[inside subscription]', { root, args, context });
        return pubsub.cursorAsyncIterator(function() {
          return Items.find();
        });
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

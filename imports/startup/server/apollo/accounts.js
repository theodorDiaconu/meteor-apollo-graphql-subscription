import { makeExecutableSchema } from 'graphql-tools';
import { initAccounts } from 'meteor/nicolaslopezj:apollo-accounts';

// Load all accounts related resolvers and type definitions into graphql-loader
initAccounts({
  loginWithFacebook: false,
  loginWithGoogle: false,
  loginWithLinkedIn: false,
  loginWithPassword: true
});

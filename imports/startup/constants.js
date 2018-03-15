import { Meteor } from 'meteor/meteor';

export const AUTH_TOKEN_KEY = 'meteor-login-token';
export const GRAPHQL_SUBSCRIPTION_PATH = '/sub';
export const GRAPHQL_SUBSCRIPTION_ENDPOINT = Meteor.absoluteUrl(
  GRAPHQL_SUBSCRIPTION_PATH
).replace(/http(s)?/, 'ws');

export const GRAPHQL_ENDPOINT = Meteor.absoluteUrl('/graphql');

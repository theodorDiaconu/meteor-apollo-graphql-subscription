import { PubSub } from 'graphql-subscriptions';
import { Random } from 'meteor/random';
export const pubsub = new PubSub();

Meteor.setInterval(() => {
  pubsub.publish('somethingChanged', Random.id());
  pubsub.publish('userList', [
    {
      firstName: 'xxx',
      lastName: 'yyy'
    }
  ]);
}, 1000);

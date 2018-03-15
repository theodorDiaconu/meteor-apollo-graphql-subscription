import { PubSub } from 'graphql-subscriptions';
import { Random } from 'meteor/random';
import { wrapPubSub } from './meteor-boink';
import { Items } from '/imports/db';

export const pubsub = new PubSub();

wrapPubSub(pubsub);
// Items.remove({});

Meteor.setInterval(() => {
  Items.insert({
    text: Random.id()
  });
}, 1000);

Meteor.setInterval(() => {
  Items.update(
    {},
    {
      $set: {
        text: Random.id()
      }
    },
    {
      multi: true
    }
  );
}, 2000);

Meteor.setInterval(() => {
  Items.remove({});
}, 15000);

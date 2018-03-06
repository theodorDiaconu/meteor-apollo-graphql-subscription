import { PubSub } from "graphql-subscriptions";
import { Random } from "meteor/random";
export const pubsub = new PubSub();

Meteor.setInterval(() => {
  pubsub.publish("somethingChanged", Random.id());
}, 1000);

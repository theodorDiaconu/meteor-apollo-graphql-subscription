pubsub.asyncIterator(() => {
  return Meteor.users.find();
})
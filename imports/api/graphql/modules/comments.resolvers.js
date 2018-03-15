export default {
  Query: {
    comments() {
      return [{ text: 'xxx' }];
    }
  },
  Mutation: {
    updateComment(root, { id }) {
      return id;
    }
  }
};

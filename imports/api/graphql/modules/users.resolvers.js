export default {
  Query: {
    users() {
      return [{ firstName: 'xxx' }];
    }
  },
  Mutation: {
    updateUser(root, { id }) {
      return 'ok';
    }
  }
};

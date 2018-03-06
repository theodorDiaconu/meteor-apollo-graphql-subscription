export default {
  getUsers() {
    return [
      {
        _id: 123,
        firstName: "John",
        lastName: "Smith",
        age: 20
      },
      {
        _id: 124,
        firstName: "Brown",
        lastName: "Steve"
      }
    ];
  },

  generateTodos(name) {
    return [
      {
        title: `${name} Wash your socks`,
        isDone: false,
        createdAt: new Date()
      },
      {
        title: `${name} Brush your teeth`,
        isDone: true,
        createdAt: new Date()
      }
    ];
  }
};

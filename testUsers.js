// First user has valid information
// Second user already exists
// Third user has incorrect info

const testUsers = {
  user1: {
    username: "testUser1",
    password: "Password1!",
    firstName: "test",
    lastName: "test",
    email: "testemail.1@test.com",
  },
  user2: {
    username: "testUser2",
    password: "Password1!",
    firstName: "test",
    lastName: "test",
    email: "testemail.2@test.com",
  },
  user3: {
    username: "testUser3",
    password: "bad",
    firstName: "test",
    lastName: "test",
    email: "testemail.3test.com",
  },
};

module.exports = testUsers;

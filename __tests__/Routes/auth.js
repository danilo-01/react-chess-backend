// Tests for /auth routes
const request = require("supertest");
const app = require("../../app");
const testUsers = require("./testUsers");
const db = require("../../Database/db");

beforeEach(async () => {
  await db.query("DELETE FROM users");
  await db.query(`INSERT INTO users (username, hashed_password, email, first_name, last_name, is_admin)
  VALUES ('testUser1', 'Password1!', 'testemail.1@test.com', 'test', 'test', ${false})`);
});

afterAll(async () => {
  db.end();
});

describe("/auth/register tests", () => {
  it("should return status 200 and contain a token", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testUser2",
      password: "Password1!",
      firstName: "test",
      lastName: "test",
      email: "testemai2.1@test.com",
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)._token).toBeDefined();
  });

  it("should return 409 with message if user already exists ", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testUser1",
      password: "Password1!",
      firstName: "test",
      lastName: "test",
      email: "testemail.1@test.com",
    });

    expect(res.statusCode).toBe(409);
    expect(JSON.parse(res.text)._token).not.toBeDefined();
    expect(JSON.parse(res.text).message).toMatch("already exists");
  });

  describe("400 response tests", () => {
    it("should return 400 with array that contains what was invalid", async () => {
      const res = await request(app)
        .post("/auth/register")
        .send(testUsers.user3);

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.text)._token).not.toBeDefined();
      expect(JSON.parse(res.text).errors).toBeDefined();
    });

    it("should return 400 with number as username", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "1",
        password: "Password1!",
        firstName: "test",
        lastName: "test",
        email: "testemai2.1@test.com",
      });

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.text)._token).not.toBeDefined();
      expect(JSON.parse(res.text).errors).toBeDefined();
    });

    it("should return 400 with number as a password", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "testUser2",
        password: "1",
        firstName: "test",
        lastName: "test",
        email: "testemai2.1@test.com",
      });

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.text)._token).not.toBeDefined();
      expect(JSON.parse(res.text).errors).toBeDefined();
    });

    it("should return 400 with number as a first name", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "testUser2",
        password: "Password1!",
        firstName: "1",
        lastName: "test",
        email: "testemai2.1@test.com",
      });

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.text)._token).not.toBeDefined();
      expect(JSON.parse(res.text).errors).toBeDefined();
    });

    it("should return 400 with number as a last name", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "testUser2",
        password: "Password1!",
        firstName: "test",
        lastName: "1",
        email: "testemai2.1@test.com",
      });

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.text)._token).not.toBeDefined();
      expect(JSON.parse(res.text).errors).toBeDefined();
    });

    it("should return 400 with number as a email", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "testUser2",
        password: "Password1!",
        firstName: "test",
        lastName: "test",
        email: "1",
      });

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.text)._token).not.toBeDefined();
      expect(JSON.parse(res.text).errors).toBeDefined();
    });

    it("should return 400 with extra key in body", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "testUser1",
        password: "Password1!",
        firstName: "test",
        lastName: "test",
        email: "testemail.1@test.com",
        favoriteDrink: "Hibiscus Tea",
      });

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.text)._token).not.toBeDefined();
      expect(JSON.parse(res.text).message).toMatch(
        "not allowed to have the additional property"
      );
    });

    it("should return 400 with missing key in body", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "testUser1",
        password: "Password1!",
        firstName: "test",
        lastName: "test",
      });

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.text)._token).not.toBeDefined();
      expect(JSON.parse(res.text).message).toMatch("requires property");
    });
  });
});

// describe("/auth/retrieve tests", () => {
//   it("should return status 200 and contain a token", async () => {
//     const res = await request(app).post("/auth/register").send({
//       username: testUsers.user2.username,
//       password: testUsers.user2.password,
//     });

//     expect(res.statusCode).toBe(200);
//     expect(res._token).toBeDefined();
//   });

//   it("should return 404 if user does not exists", async () => {
//     const res = await request(app).post("/auth/register").send({
//       username: testUsers.user2.username,
//       password: testUsers.user2.password,
//     });

//     expect(res.statusCode).toBe(404);
//     expect(res._token).not.toBeDefined();
//     expect(res.message).toBe("/does not exist/");
//   });

//   it("should return 400 if missing username", async () => {
//     const res = await request(app).post("/auth/register").send({
//       password: testUsers.user2.password,
//     });

//     expect(res.statusCode).toBe(404);
//     expect(res._token).not.toBeDefined();
//     expect(res.message).toBe("/missing/");
//   });
// });

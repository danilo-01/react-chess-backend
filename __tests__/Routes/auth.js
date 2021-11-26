// Tests for /auth routes
const request = require("supertest");
const app = require("../../app");
const db = require("../../Database/db");
let testUser;

beforeEach(async () => {
  await db.query("DELETE FROM users");
  testUser = {
    username: "testUser1",
    password: "Password1!",
    firstName: "test",
    lastName: "test",
    email: "testemail.1@test.com",
  };

  await request(app).post("/auth/register").send(testUser);
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
      email: "testemail.2@test.com",
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
    // it("should return 400 with array that contains what was invalid", async () => {
    //   delete testUser.username;
    //   delete testUser.username;
    //   const res = await request(app).post("/auth/register").send(testUser);

    //   expect(res.statusCode).toBe(400);
    //   expect(JSON.parse(res.text)._token).not.toBeDefined();
    //   expect(JSON.parse(res.text).errors).toBeDefined();
    // });

    it("should return 400 with number as username", async () => {
      testUser.username = "1";
      const res = await request(app).post("/auth/register").send(testUser);

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.text)._token).not.toBeDefined();
      expect(JSON.parse(res.text).errors).toBeDefined();
    });

    it("should return 400 with number as a password", async () => {
      testUser.password = "1";
      const res = await request(app).post("/auth/register").send(testUser);

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.text)._token).not.toBeDefined();
      expect(JSON.parse(res.text).errors).toBeDefined();
    });

    it("should return 400 with number as a first name", async () => {
      testUser.firstName = "1";
      const res = await request(app).post("/auth/register").send(testUser);

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.text)._token).not.toBeDefined();
      expect(JSON.parse(res.text).errors).toBeDefined();
    });

    it("should return 400 with number as a last name", async () => {
      testUser.lastName = "1";
      const res = await request(app).post("/auth/register").send(testUser);

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.text)._token).not.toBeDefined();
      expect(JSON.parse(res.text).errors).toBeDefined();
    });

    it("should return 400 with number as a email", async () => {
      testUser.email = "1";
      const res = await request(app).post("/auth/register").send(testUser);

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.text)._token).not.toBeDefined();
      expect(JSON.parse(res.text).errors).toBeDefined();
    });

    it("should return 400 with extra key in body", async () => {
      testUser.extraKey = "key";
      const res = await request(app).post("/auth/register").send(testUser);

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.text)._token).not.toBeDefined();
      expect(JSON.parse(res.text).message).toMatch(
        "not allowed to have the additional property"
      );
    });

    it("should return 400 with missing key in body", async () => {
      delete testUser.username;
      const res = await request(app).post("/auth/register").send(testUser);

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.text)._token).not.toBeDefined();
      expect(JSON.parse(res.text).message).toMatch("requires property");
    });
  });
});

// describe("/auth/retrieve tests", () => {
//   it("should return status 200 and contain a token", async () => {
//     const res = await request(app).post("/auth/retrieve").send({
//       username: "testUser2",
//       password: "Password1!",
//     });

//     expect(res.statusCode).toBe(200);
//     expect(JSON.parse(res)._token).toBeDefined();
//   });

//   it("should return 404 if user does not exists", async () => {
//     const res = await request(app).post("/auth/retrieve").send({
//       username: "testUser12",
//       password: "Password1!",
//     });

//     expect(res.statusCode).toBe(404);
//     expect(JSON.parse(res)._token).not.toBeDefined();
//     expect(JSON.parse(res).message).toBe("/does not exist/");
//   });

//   it("should return 400 if missing username", async () => {
//     const res = await request(app).post("/auth/retrieve").send({
//       password: testUsers.user2.password,
//     });

//     expect(res.statusCode).toBe(404);
//     expect(res._token).not.toBeDefined();
//     expect(res.message).toBe("/missing/");
//   });
// });

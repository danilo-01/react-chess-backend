// Tests for /auth routes
const { body } = require("express-validator");
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

// TODO
// test unique character entries

describe("/auth/register", () => {
  test("valid request", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testUser2",
      password: "Password1!",
      firstName: "test",
      lastName: "test",
      email: "testemail.2@test.com",
    });
    const resBody = JSON.parse(res.text);
    expect(res.statusCode).toBe(200);
    expect(resBody._token).toBeDefined();
  });

  test("creating a user that already exists", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testUser1",
      password: "Password1!",
      firstName: "test",
      lastName: "test",
      email: "testemail.1@test.com",
    });
    const resBody = JSON.parse(res.text);
    expect(res.statusCode).toBe(409);
    expect(resBody._token).not.toBeDefined();
    expect(resBody.message).toMatch("already exists");
  });

  describe("400 responses", () => {
    test("entering a number as 'username'", async () => {
      testUser.username = "1";
      const res = await request(app).post("/auth/register").send(testUser);
      const resBody = JSON.parse(res.text);
      expect(res.statusCode).toBe(400);
      expect(resBody._token).not.toBeDefined();
      expect(resBody.message).toBeDefined();
    });

    test("entering a number as 'password'", async () => {
      testUser.password = "1";
      const res = await request(app).post("/auth/register").send(testUser);
      const resBody = JSON.parse(res.text);
      expect(res.statusCode).toBe(400);
      expect(resBody._token).not.toBeDefined();
      expect(resBody.message).toBeDefined();
    });

    test("entering a number as 'firstName'", async () => {
      testUser.firstName = "1";
      const res = await request(app).post("/auth/register").send(testUser);
      const resBody = JSON.parse(res.text);
      expect(res.statusCode).toBe(400);
      expect(resBody._token).not.toBeDefined();
      expect(resBody.message).toBeDefined();
    });

    test("entering a number as 'lastName'", async () => {
      testUser.lastName = "1";
      const res = await request(app).post("/auth/register").send(testUser);
      const resBody = JSON.parse(res.text);
      expect(res.statusCode).toBe(400);
      expect(resBody._token).not.toBeDefined();
      expect(resBody.message).toBeDefined();
    });

    test("entering a number as 'email'", async () => {
      testUser.email = "1";
      const res = await request(app).post("/auth/register").send(testUser);
      const resBody = JSON.parse(res.text);
      expect(res.statusCode).toBe(400);
      expect(resBody._token).not.toBeDefined();
      expect(resBody.message).toBeDefined();
    });

    test("entering an extra key in body", async () => {
      testUser.extraKey = "key";
      const res = await request(app).post("/auth/register").send(testUser);
      const resBody = JSON.parse(res.text);
      expect(res.statusCode).toBe(400);
      expect(resBody._token).not.toBeDefined();
      expect(resBody.message).toMatch(
        "not allowed to have the additional property"
      );
    });

    test("missing a key in body", async () => {
      delete testUser.username;
      const res = await request(app).post("/auth/register").send(testUser);
      const resBody = JSON.parse(res.text);
      expect(res.statusCode).toBe(400);
      expect(resBody._token).not.toBeDefined();
      expect(resBody.message).toMatch("requires property");
    });
  });
});

describe("/auth/retrieve", () => {
  test("valid request", async () => {
    const res = await request(app).post("/auth/retrieve").send({
      username: testUser.username,
      password: testUser.password,
    });

    resBody = JSON.parse(res.text);
    expect(res.statusCode).toBe(200);
    expect(resBody._token).toBeDefined();
  });

  test("entering a username that doesnt exist", async () => {
    const res = await request(app).post("/auth/retrieve").send({
      username: "unknownUser",
      password: "password",
    });

    const resBody = JSON.parse(res.text);
    expect(res.statusCode).toBe(404);
    expect(resBody._token).not.toBeDefined();
    expect(resBody.message).toBe("User not found");
  });

  test("missing 'username' in request", async () => {
    const res = await request(app).post("/auth/retrieve").send({
      password: testUser.password,
    });

    const resBody = JSON.parse(res.text);
    expect(res.statusCode).toBe(400);
    expect(resBody._token).not.toBeDefined();
    expect(resBody.message).toMatch("requires property");
  });

  test("missing 'password' in request", async () => {
    const res = await request(app).post("/auth/retrieve").send({
      username: testUser.username,
    });

    const resBody = JSON.parse(res.text);
    expect(res.statusCode).toBe(400);
    expect(resBody._token).not.toBeDefined();
    expect(resBody.message).toMatch("requires property");
  });

  test("entering an incorrect password", async () => {
    const res = await request(app).post("/auth/retrieve").send({
      username: testUser.username,
      password: "bad password",
    });

    const resBody = JSON.parse(res.text);
    expect(res.statusCode).toBe(401);
    expect(resBody._token).not.toBeDefined();
    expect(resBody.message).toMatch("Unauthorized");
  });
});

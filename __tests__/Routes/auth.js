// Tests for /auth routes
const request = require("supertest");
const app = require("../../app");
const testUsers = require("./testUsers");

describe("/auth/register tests", () => {
  it("should return status 200 and contain a token", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testUser1",
      password: "Password1!",
      firstName: "test",
      lastName: "test",
      email: "testemail.1@test.com",
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)._token).toBeDefined();
  });

  it("should return status 200 and contain a token without lastName", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testUser1",
      password: "Password1!",
      firstName: "test",
      email: "testemail.1@test.com",
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)._token).toBeDefined();
  });

  it("should return 409 with message if user already exists ", async () => {
    const res = await request(app).post("/auth/register").send(testUsers.user1);

    expect(res.statusCode).toBe(409);
    expect(res._token).not.toBeDefined();
    expect(res.message).toBe("/already taken/");
  });

  describe("400 response tests", () => {
    it("should return 400 with array that contains what was invalid", async () => {
      const res = await request(app)
        .post("/auth/register")
        .send(testUsers.user3);

      expect(res.statusCode).toBe(400);
      expect(res._token).not.toBeDefined();
      expect(res.message).toBe("/invalid values/");
    });

    it("should return 400 with number as username", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "1",
        password: "Password1!",
        firstName: "test",
        lastName: "test",
        email: "testemail.1@test.com",
      });

      expect(res.statusCode).toBe(400);
      expect(res._token).not.toBeDefined();
      expect(res.message).toBe("/username/");
    });

    it("should return 400 with number as a password", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "testUser1",
        password: "1",
        firstName: "test",
        lastName: "test",
        email: "testemail.1@test.com",
      });

      expect(res.statusCode).toBe(400);
      expect(res._token).not.toBeDefined();
      expect(res.message).toBe("/password/");
    });

    it("should return 400 with number as a first name", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "testUser1",
        password: "Password1!",
        firstName: "1",
        lastName: "test",
        email: "testemail.1@test.com",
      });

      expect(res.statusCode).toBe(400);
      expect(res._token).not.toBeDefined();
      expect(res.message).toBe("/firstName/");
    });

    it("should return 400 with number as a last name", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "testUser1",
        password: "Password1!",
        firstName: "test",
        lastName: "1",
        email: "testemail.1@test.com",
      });

      expect(res.statusCode).toBe(400);
      expect(res._token).not.toBeDefined();
      expect(res.message).toBe("/lastName/");
    });

    it("should return 400 with number as a email", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "testUser1",
        password: "Password1!",
        firstName: "test",
        lastName: "test",
        email: "1",
      });

      expect(res.statusCode).toBe(400);
      expect(res._token).not.toBeDefined();
      expect(res.message).toBe("/email/");
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
      expect(res._token).not.toBeDefined();
      expect(res.message).toBe("/invalid/");
    });

    it("should return 400 with missing key in body", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "testUser1",
        password: "Password1!",
        firstName: "test",
        lastName: "test",
      });

      expect(res.statusCode).toBe(400);
      expect(res._token).not.toBeDefined();
      expect(res.message).toBe("/missing/");
    });
  });
});

describe("/auth/retrieve tests", () => {
  it("should return status 200 and contain a token", async () => {
    const res = await request(app).post("/auth/register").send({
      username: testUsers.user2.username,
      password: testUsers.user2.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res._token).toBeDefined();
  });

  it("should return 404 if user does not exists", async () => {
    const res = await request(app).post("/auth/register").send({
      username: testUsers.user2.username,
      password: testUsers.user2.password,
    });

    expect(res.statusCode).toBe(404);
    expect(res._token).not.toBeDefined();
    expect(res.message).toBe("/does not exist/");
  });

  it("should return 400 if missing username", async () => {
    const res = await request(app).post("/auth/register").send({
      password: testUsers.user2.password,
    });

    expect(res.statusCode).toBe(404);
    expect(res._token).not.toBeDefined();
    expect(res.message).toBe("/missing/");
  });
});

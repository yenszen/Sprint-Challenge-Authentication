const request = require("supertest");
const server = require("./auth-router");
const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");
const { addUser, findBy } = require("./auth-model");

describe("auth-router.js", () => {
  describe("/register", () => {
    // it("should add a new user to the database", async () => {
    //   const credentials = { username: "wigfird", password: "123pop" };
    //   const hash = bcrypt.hashSync(credentials.password, 10);
    //   credentials.password = hash;

    //   await addUser(credentials);

    //   const users = await db("users");
    //   expect(users).toHaveLength(1);
    // });

    // it("should contain hashed password in database", async () => {
    //   const credentials = { username: "wigfird", password: "123pop" };
    //   const hash = bcrypt.hashSync(credentials.password, 10);
    //   credentials.password = hash;

    //   await addUser(credentials);

    //   const users = await db("users");
    //   expect(users[0].password).toBe(credentials.password);
    // });

    it("should return 200 OK status code", async () => {
      const res = await request(server)
        .post("/register")
        .send({ username: "jack", password: "123pop" });
      expect(res.status).toBe(201);
    });

    beforeEach(async () => {
      return db("users").truncate();
    });
  });
});

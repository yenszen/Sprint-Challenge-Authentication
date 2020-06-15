const request = require("supertest");
const server = require("./auth-router");

describe("auth-router.js", () => {
  describe("/register", () => {
    it("should be in the testing environment", async () => {
      expect(process.env.DB_ENV).toBe("testing");
    });

    it("should return 201 OK status code", async () => {
      const res = await request(server)
        .post("/register")
        .send({ username: "jack", password: "123pop" });

      expect(res.status).toBe(201);
    });

    it("should return error message if register credentials are invalid", async () => {
      const res = await request(server)
        .post("/register")
        .send({ username: "wilson" });

      expect(res.body).toEqual({
        message:
          "Please provide username and password, with password being alphanumeric"
      });
    });
  });

  describe("/login", () => {
    it("should return a 200 OK status code", async () => {
      const res = await request(server)
        .post("/login")
        .send({ username: "jack", password: "123pop" });

      expect(res.status).toBe(200);
    });

    it("should return a JSON object", async () => {
      const res = await request(server)
        .post("/login")
        .send({ username: "jack", password: "123pop" });

      expect(res.type).toBe("application/json");
    });
  });
});

const request = require("supertest");
const server = require("./server");

describe("server.js", () => {
  it("should return a 200 OK status code", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });

  it("should return JSON object", async () => {
    const res = await request(server).get("/");
    expect(res.type).toBe("application/json");
  });

  it("should return the right object", async () => {
    const res = await request(server).get("/");
    expect(res.body).toEqual({ api: "up" });
  });
});

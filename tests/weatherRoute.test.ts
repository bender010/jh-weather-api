import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../src/app";

describe("GET /health", () => {
  it("returns status ok", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "ok"
    });
  });
});

describe("GET /", () => {
  it("returns the API message", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Weather Service API"
    });
  });
});
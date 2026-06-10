import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { app } from "../src/app";

vi.mock("../src/weatherService", () => ({
  getWeatherForecast: vi.fn(async () => ({
    latitude: 39.7456,
    longitude: -97.0892,
    period: "Today",
    shortForecast: "Partly Sunny",
    temperature: 72,
    temperatureUnit: "F",
    temperatureCategory: "moderate"
  }))
}));

describe("GET /health", () => {
  it("returns status ok", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});

describe("GET /", () => {
  it("returns the API message", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Weather Service API");
  });
});

describe("GET /api/weather", () => {
  it("returns 400 when lat or lon are missing", async () => {
    const response = await request(app).get("/api/weather");

    expect(response.status).toBe(400);
  });

  it("returns 400 when coordinates are out of range", async () => {
    const response = await request(app).get("/api/weather?lat=200&lon=-95");

    expect(response.status).toBe(400);
  });

  it("returns weather forecast data for valid coordinates", async () => {
    const response = await request(app).get(
      "/api/weather?lat=39.7456&lon=-97.0892"
    );

    expect(response.status).toBe(200);
    expect(response.body.shortForecast).toBe("Partly Sunny");
    expect(response.body.temperatureCategory).toBe("moderate");
  });
});
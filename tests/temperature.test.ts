import { describe, expect, it } from "vitest";
import { categorizeTemperature } from "../src/temperature";

describe("categorizeTemperature", () => {
  it("returns cold for temperatures 45°F and below", () => {
    expect(categorizeTemperature(45)).toBe("cold");
  });

  it("returns hot for temperatures 85°F and above", () => {
    expect(categorizeTemperature(85)).toBe("hot");
  });

  it("returns moderate for temperatures between 46°F and 84°F", () => {
    expect(categorizeTemperature(70)).toBe("moderate");
  });
});
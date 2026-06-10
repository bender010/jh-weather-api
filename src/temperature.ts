export type TemperatureCategory = "hot" | "cold" | "moderate";

export function categorizeTemperature(tempF: number): TemperatureCategory {
  if (tempF >= 85) return "hot";
  if (tempF <= 45) return "cold";
  return "moderate";
}
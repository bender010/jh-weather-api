import { categorizeTemperature, TemperatureCategory } from "./temperature";

const NWS_BASE_URL = "https://api.weather.gov";

interface PointsResponse {
  properties: {
    forecast: string;
  };
}

interface ForecastPeriod {
  name: string;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  isDaytime: boolean;
}

interface ForecastResponse {
  properties: {
    periods: ForecastPeriod[];
  };
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  period: string;
  shortForecast: string;
  temperature: number;
  temperatureUnit: string;
  temperatureCategory: TemperatureCategory;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        process.env.NWS_USER_AGENT ?? "jh-weather-api, contact@example.com",
      Accept: "application/geo+json"
    }
  });

  if (!response.ok) {
    throw new Error(`NWS request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function getWeatherForecast(
  latitude: number,
  longitude: number
): Promise<WeatherResponse> {
  const pointsUrl = `${NWS_BASE_URL}/points/${latitude},${longitude}`;

  const pointsData = await fetchJson<PointsResponse>(pointsUrl);
  const forecastData = await fetchJson<ForecastResponse>(
    pointsData.properties.forecast
  );

  const today =
    forecastData.properties.periods.find((period) => period.name === "Today") ??
    forecastData.properties.periods.find((period) => period.isDaytime) ??
    forecastData.properties.periods[0];

  if (!today) {
    throw new Error("No forecast periods returned from NWS.");
  }

  return {
    latitude,
    longitude,
    period: today.name,
    shortForecast: today.shortForecast,
    temperature: today.temperature,
    temperatureUnit: today.temperatureUnit,
    temperatureCategory: categorizeTemperature(today.temperature)
  };
}
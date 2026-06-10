import express from "express";
import cors from "cors";
import { getWeatherForecast } from "./weatherService";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Weather Service API",
    example: "/api/weather?lat=39.7456&lon=-97.0892"
  });
});

app.get("/health", (_req, res) => {
  res.json({
    status: "ok"
  });
});

app.get("/api/weather", async (req, res) => {
  const lat = Number(req.query.lat);
  const lon = Number(req.query.lon);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return res.status(400).json({
      error: "lat and lon query parameters are required and must be valid numbers."
    });
  }

  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return res.status(400).json({
      error: "lat must be between -90 and 90. lon must be between -180 and 180."
    });
  }

  try {
    const forecast = await getWeatherForecast(lat, lon);
    return res.json(forecast);
  } catch {
    return res.status(502).json({
      error: "Unable to retrieve forecast from the National Weather Service."
    });
  }
});
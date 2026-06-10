import express from "express";
import cors from "cors";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Weather Service API"
  });
});

app.get("/health", (_req, res) => {
  res.json({
    status: "ok"
  });
});
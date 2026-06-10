# Jack Henry Weather Service API

A TypeScript and Express API that retrieves forecast information from the National Weather Service (NWS) API.

This project was created as part of the Jack Henry Software Engineer Apprentice coding assignment.

## Features

* Accepts latitude and longitude coordinates
* Retrieves forecast data from the National Weather Service API
* Returns today's short forecast
* Classifies temperatures as:

  * Cold (45°F and below)
  * Moderate (46°F - 84°F)
  * Hot (85°F and above)
* Includes validation for coordinate input
* Includes unit and route tests

## Technologies Used

* Node.js
* TypeScript
* Express
* Vitest
* Supertest

## Installation

Clone the repository:

```bash
git clone https://github.com/bender010/jh-weather-api.git
cd jh-weather-api
```

Install dependencies:

```bash
npm install
```

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## API Endpoints

### Health Check

```http
GET /health
```

Example Response:

```json
{
  "status": "ok"
}
```

### Weather Forecast

```http
GET /api/weather?lat=39.7456&lon=-97.0892
```

Example Response:

```json
{
  "latitude": 39.7456,
  "longitude": -97.0892,
  "period": "Today",
  "shortForecast": "Partly Sunny",
  "temperature": 72,
  "temperatureUnit": "F",
  "temperatureCategory": "moderate"
}
```

## Testing

Run tests:

```bash
npm test -- --run
```

## Build

Compile TypeScript:

```bash
npm run build
```

## Design Notes

For simplicity, this implementation:

* Uses the NWS `/points/{lat},{lon}` endpoint to discover the forecast endpoint
* Uses the first daytime forecast period returned by NWS
* Performs basic input validation
* Returns a simplified forecast response focused on assignment requirements

Potential future improvements:

* Response caching
* Structured logging
* Rate limiting
* Expanded forecast support
* Integration tests against the live NWS service

## AI Usage

AI-assisted tooling was used during development for guidance, code generation, troubleshooting, and learning TypeScript/Node.js patterns.

All generated code was reviewed, tested, modified, and committed incrementally as part of the development process.

## Live Demo

Base URL:

https://jh-weather-api.onrender.com

Example weather request:

https://jh-weather-api.onrender.com/api/weather?lat=39.7456&lon=-97.0892

### Hosting Note

This application is deployed using Render's free hosting tier. If the service has been inactive, the first request may take several seconds to respond while the instance starts. Subsequent requests should respond normally once the service is running.

### Assumptions

* Temperatures of 45°F and below are classified as "cold"
* Temperatures of 85°F and above are classified as "hot"
* Temperatures between 46°F and 84°F are classified as "moderate"

These thresholds were selected as a simple heuristic for the purposes of the assignment and could be adjusted based on business requirements.

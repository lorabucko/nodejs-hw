# Express App

A small учебный backend project built with **Node.js** and **Express** for working with a notes collection. According to the assignment, the server should handle HTTP requests, return mock responses for note routes, and include basic error handling. [cite:1]

## Project Overview

This project is a minimal Express application with a route for retrieving all notes, a route for retrieving a single note by `noteId`, and a separate test route for checking error handling. The server must also use the `PORT` environment variable via `dotenv`, middleware such as `cors` and `express.json()`, HTTP logging with `pino-http`, and dedicated `404` and `500` middleware.

## Tech Stack

- Node.js
- Express
- dotenv
- cors
- pino-http
- nodemon (for development)
- ESLint

## Installed Modules

### Production dependencies

- `express` — web server and routing.
- `dotenv` — loads environment variables from the `.env` file.
- `cors` — enables requests from other domains.
- `pino-http` — logs incoming HTTP requests.

### Development dependencies

- `nodemon` — automatically restarts the server during development.
- `eslint` — checks code quality and style.

## Main Features

- `GET /notes` — returns the message `Retrieved all notes`.
- `GET /notes/:noteId` — returns the message `Retrieved note with ID: ...`.
- `GET /test-error` — intentionally throws the error `Simulated server error` to test error-handling middleware.
- Handles unknown routes with a `404` response and the message `Route not found`.
- Handles server errors with a `500` response and the error message text.

## Project Structure

```bash
nodejs-hw/
├── src/
│   └── server.js
├── .env
├── .gitignore
├── .prettierrc
└── package.json
```

This structure is required by the assignment: the server logic is placed inside `src`, while configuration files stay in the project root.

## Run the Project

```bash
npm install
npm run dev
```

According to the assignment requirements, `package.json` must include `start` and `dev` scripts, and the server should run on the port provided by `PORT` or fall back to `3000` if the environment variable is not available.

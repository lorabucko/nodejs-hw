# Notes API

A backend REST API built with **Node.js**, **Express**, **MongoDB Atlas**, and **Mongoose**. The application provides CRUD operations for a notes collection and follows a modular project structure.

## Features

- Connects to MongoDB Atlas using Mongoose
- Uses environment variables for configuration
- Logs HTTP requests with `pino-http`
- Returns JSON responses
- Handles unknown routes with a `404` response
- Handles server and HTTP errors through a global error handler
- Supports full CRUD operations for notes:
  - Get all notes
  - Get one note by ID
  - Create a note
  - Update a note
  - Delete a note

## Tech Stack

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- dotenv
- cors
- pino-http
- pino-pretty
- http-errors
- nodemon
- ESLint

## API Endpoints

| Method | Endpoint | Description | Success status |
|---|---|---|---:|
| `GET` | `/notes` | Get all notes | `200` |
| `GET` | `/notes/:noteId` | Get a note by its ID | `200` |
| `POST` | `/notes` | Create a new note | `201` |
| `PATCH` | `/notes/:noteId` | Update an existing note | `200` |
| `DELETE` | `/notes/:noteId` | Delete an existing note | `200` |

### Create a Note

**Request**

```json
{
  "title": "Shopping list",
  "content": "Toothpaste, soap, shampoo",
  "tag": "Shopping"
}
```

`title` is required. `content` is optional and defaults to an empty string. `tag` is optional and defaults to `Todo`.

Available tag values:

```text
Work, Personal, Meeting, Shopping, Ideas, Travel, Finance, Health, Important, Todo
```

### Error Responses

Unknown routes return:

```json
{
  "message": "Route not found"
}
```

A request for a note that does not exist returns:

```json
{
  "message": "Note not found"
}
```

## Note Model

Each note contains:

```text
_id
title
content
tag
createdAt
updatedAt
```

The `createdAt` and `updatedAt` fields are generated automatically by Mongoose through the `timestamps: true` schema option.

## Project Structure

```text
nodejs-hw/
├── src/
│   ├── controllers/
│   │   └── notesController.js
│   ├── db/
│   │   └── connectMongoDB.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   └── notFoundHandler.js
│   ├── models/
│   │   └── note.js
│   ├── routes/
│   │   └── notesRoutes.js
│   └── server.js
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── package.json
└── README.md
```

## Environment Variables

PORT=
MONGO_URL=

## Installation

```bash
git clone https://github.com/lorabucko/nodejs-hw.git
cd nodejs-hw
git checkout 02-mongodb
npm install
```

## Run Locally

Start the development server:

```bash
npm run dev
```

The server starts only after a successful MongoDB connection.

Expected terminal output:

```text
✅ MongoDB connection established successfully
Server is running on port 3000
```

## Deployment

The API is deployed from the `02-mongodb` branch to Render.

For deployment, add `MONGO_URL` as an environment variable in the Render dashboard. Render provides the `PORT` variable for web services automatically.

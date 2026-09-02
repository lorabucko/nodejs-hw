# Notes API

Backend REST API for managing notes, built with Node.js, Express, MongoDB Atlas, and Mongoose. In the `03-validation` branch, the project adds request validation with `celebrate`, note filtering by tag and text, and pagination for the notes collection.

## Features

- CRUD operations for notes: create, read, update, and delete.
- Filtering in `GET /notes` by `tag` and text search through `search` query params.
- Case-insensitive search in `title` and `content` using MongoDB `$regex`.
- Pagination in `GET /notes` with `page` and `perPage`.
- Validation of query params, route params, and request bodies with
- Global handling for 404 routes, validation errors, and server errors.

## Tech stack

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Celebrate
- dotenv
- cors
- pino-http
- pino-pretty
- http-errors
- ESLint
- Nodemon

## Project structure

```text
nodejs-hw/
├── src/
│   ├── constants/
│   │   └── tags.js
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
│   ├── validations/
│   │   └── notesValidation.js
│   └── server.js
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── package.json
└── README.md
```

The homework requires the tag list to be moved to `src/constants/tags.js` and validation schemas to be placed in `src/validations/notesValidation.js`

## Environment variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
```

The assignment explicitly requires `PORT` and `MONGO_URL` to be stored in `.env`.

## Installation

```bash
git clone https://github.com/lorabucko/nodejs-hw.git
cd nodejs-hw
git checkout 03-validation
npm install
```

The task must be completed in the `03-validation` branch.

## Run locally

Start the development server:

```bash
npm run dev
```

The server should connect to MongoDB successfully before it starts listening for requests.

## Available tags

The allowed tag values are:

```text
Work, Personal, Meeting, Shopping, Ideas, Travel, Finance, Health, Important, Todo
```

These tags are defined for note categorization and are reused for validation

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/notes` | Get notes with optional filtering, search, and pagination |
| `GET` | `/notes/:noteId` | Get one note by ID. |
| `POST` | `/notes` | Create a new note. |
| `PATCH` | `/notes/:noteId` | Update an existing note |
| `DELETE` | `/notes/:noteId` | Delete a note by ID. |

## Query parameters for GET /notes

| Parameter | Type | Rules |
|---|---|---|
| `page` | Number | Integer, minimum `1`, default `1`. |
| `perPage` | Number | Integer, minimum `5`, maximum `20`, default `10`. |
| `tag` | String | Optional, must be one of the allowed tags.|
| `search` | String | Optional, may be an empty string. |

Example request:

```http
GET /notes?page=1&perPage=10&tag=Todo&search=hello
```

Successful response format:

```json
{
  "page": 1,
  "perPage": 10,
  "totalNotes": 42,
  "totalPages": 5,
  "notes": []
}
```

The homework requires `GET /notes` to return `page`, `perPage`, `totalNotes`, `totalPages`, and `notes` in the response body.

## Validation rules

### GET /notes

Validates query parameters with `getAllNotesSchema`.

### GET /notes/:noteId and DELETE /notes/:noteId

Validates `noteId` as a string with a custom check based on `isValidObjectId` from Mongoose using `noteIdSchema`.

### POST /notes

Validates the request body with `createNoteSchema`:

```json
{
  "title": "Shopping list",
  "content": "Toothpaste, soap, shampoo",
  "tag": "Shopping"
}
```

`title` is required, `content` is optional and may be empty, and `tag` is optional but must match an allowed value.

### PATCH /notes/:noteId

Validates both `noteId` and the request body in one schema called `updateNoteSchema`. At least one of `title`, `content`, or `tag` must be present in the body.

## Error handling

- Unknown routes should return `404`.
- Validation errors from `celebrate` should be handled in `server.js`.
- Server errors should be handled globally with `500` responses or specific errors via `http-errors`.

## Deployment

Deploy the app from the `03-validation` branch to Render and verify that the deployed backend works correctly with all routes and environment variables configured.

## Submission checklist

- The completed code is in branch `03-validation`.
- GitHub repository link is provided.
- Render deployment link is provided.
- MongoDB connection works correctly.
- `.env` contains `PORT` and `MONGO_URL`.
- All routes and validations work as expected.
- After the final push, wait about 5 minutes before submitting the homework for review.

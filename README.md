# Notes API

REST API for managing private user notes. The project is built with Node.js, Express, MongoDB Atlas, and Mongoose.

This version implements user authentication with sessions and HTTP-only cookies. Each user can access, create, update, and delete only their own notes.

## Features

- User registration with email and password
- Password hashing with `bcrypt`
- User login and logout
- Session creation and storage in MongoDB
- `accessToken`, `refreshToken`, and `sessionId` stored in HTTP-only cookies
- Session refresh with a refresh token
- Protected notes routes for authenticated users only
- Private note collections: users can access only their own notes
- CRUD operations for notes
- Note filtering, search, sorting, and pagination
- Request validation with `celebrate` and Joi
- Global handling of validation errors, missing routes, and server errors

## Tech Stack

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- bcrypt
- celebrate
- cookie-parser
- dotenv
- cors
- pino-http
- pino-pretty
- http-errors
- ESLint
- Nodemon

## Project Structure

```text
nodejs-hw/
├── src/
│   ├── constants/
│   │   ├── tags.js
│   │   └── time.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── notesController.js
│   ├── db/
│   │   └── connectMongoDB.js
│   ├── middleware/
│   │   ├── authenticate.js
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   └── notFoundHandler.js
│   ├── models/
│   │   ├── note.js
│   │   ├── session.js
│   │   └── user.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── notesRoutes.js
│   ├── services/
│   │   └── auth.js
│   ├── validations/
│   │   ├── authValidation.js
│   │   └── notesValidation.js
│   └── server.js
├── .env.example
├── .gitignore
├── eslint.config.js
├── package.json
└── README.md
```

## Environment Variables

Create a `.env` file in the root directory of the project:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
```

The `.env` file must not be committed to GitHub.

## Installation

```bash
git clone [https://github.com/lorabucko/nodejs-hw.git](https://github.com/lorabucko/nodejs-hw.git)
cd nodejs-hw
git checkout 04-auth
npm install
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Start the production server:

```bash
npm start
```

The server connects to MongoDB before it starts listening for requests.

## Authentication

Authentication is based on sessions stored in MongoDB.

After successful registration or login, the server creates a session and sends three cookies:

- `accessToken` — valid for 15 minutes
- `refreshToken` — valid for 1 day
- `sessionId` — valid for 1 day

Cookies use the following options:

```js
{
  httpOnly: true,
  secure: true,
  sameSite: 'none',
}
```

Passwords are never returned in API responses.

## Auth Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user and create

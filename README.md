# Notes API

REST API for managing private user notes with authentication, password reset via email, and avatar upload.

The project is built with Node.js, Express, MongoDB Atlas, and Mongoose.
This version implements authentication with sessions and HTTP-only cookies, password reset via email using Brevo SMTP, and avatar image upload to Cloudinary. Each user can access only their own notes.

## Features

- User registration with email and password
- Password hashing with `bcrypt`
- User login and logout
- Session creation and storage in MongoDB
- `accessToken`, `refreshToken`, and `sessionId` stored in HTTP-only cookies
- Session refresh with a refresh token
- Password reset request via email
- Password reset with JWT token
- Avatar upload for authenticated users
- Image upload to Cloudinary
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
- cors
- dotenv
- pino-http
- pino-pretty
- http-errors
- nodemailer
- handlebars
- jsonwebtoken
- multer
- cloudinary
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
│   │   ├── notesController.js
│   │   └── userController.js
│   ├── db/
│   │   └── connectMongoDB.js
│   ├── middleware/
│   │   ├── authenticate.js
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   ├── multer.js
│   │   └── notFoundHandler.js
│   ├── models/
│   │   ├── note.js
│   │   ├── session.js
│   │   └── user.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── notesRoutes.js
│   │   └── userRoutes.js
│   ├── services/
│   │   └── auth.js
│   ├── templates/
│   │   └── reset-password-email.html
│   ├── utils/
│   │   ├── saveFileToCloudinary.js
│   │   └── sendMail.js
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

Create a `.env` file in the root directory of the project.

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
FRONTEND_DOMAIN=http://localhost:3001

SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_brevo_smtp_login
SMTP_PASSWORD=your_brevo_smtp_key
SMTP_FROM=your_verified_sender_email

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

The `.env` file must not be committed to GitHub.

## Installation

```bash
git clone [https://github.com/lorabucko/nodejs-hw.git](https://github.com/lorabucko/nodejs-hw.git)
cd nodejs-hw
git checkout 05-mail-and-img
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
| `POST` | `/auth/register` | Register a new user and create a session |
| `POST` | `/auth/login` | Log in user and create a session |
| `POST` | `/auth/refresh` | Refresh session and issue new cookies |
| `POST` | `/auth/logout` | Log out user and clear session |
| `POST` | `/auth/request-reset-email` | Send password reset email |
| `POST` | `/auth/reset-password` | Reset password using token from email |

## User Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `PATCH` | `/users/me/avatar` | Upload or update authenticated user avatar |

## Notes Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/notes` | Get all notes of authenticated user |
| `GET` | `/notes/:id` | Get note by id |
| `POST` | `/notes` | Create a new note |
| `PATCH` | `/notes/:id` | Update note by id |
| `DELETE` | `/notes/:id` | Delete note by id |

## Password Reset Flow

1. User sends `POST /auth/request-reset-email` with their email.
2. Server generates a JWT token valid for 15 minutes.
3. Server sends an email with a reset link.
4. User submits `POST /auth/reset-password` with the token and new password.
5. Server verifies the token and updates the password.

## Avatar Upload

Avatar upload is available only for authenticated users.

- Request type: `multipart/form-data`
- Field name: `avatar`
- Max file size: 2 MB
- Allowed files: image files only
- Uploaded images are stored in Cloudinary

## Deployment

The project can be deployed to Render.

Important deployment notes:
- set the start command to run `src/server.js`
- add all environment variables in Render dashboard
- if Brevo IP restrictions are enabled, authorize the Render outgoing IP or disable the restriction for deployment testing
- use HTTPS deployment URL to correctly test secure cookies

## Author

GitHub: [lorabucko](https://github.com/lorabucko)

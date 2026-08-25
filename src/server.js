// src/server.js
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pinoHttp  from 'pino-http';
import { connectMongoDB } from './db/connectMongoDB.js';
import Notes from './models/notes.js';

const app = express();
const PORT = Number(process.env.PORT) || 3030;

app.use(cors());
app.use(express.json());


// повертає всі нотатки
app.get('/notes', (req, res) => {
  const notes = Notes.find();
  res.json(notes);
});


// повертає одну нотатку за ID
  app.get('/notes/:noteId', (req, res) => {
  res.status(200).json({
	message: `Retrieved note with ID: ${req.params.noteId}`
});
});

//  Маршрут для тестування middleware помилки
app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});

// Middleware 404 для обробки неiснуючих маршрутів
app.use(((req, res, next) => {
  res.status(404).json({
    message: 'Route not found'
  });
}));

// Middleware для обробки помилок (останнє)
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

// підключення до MongoDB
await connectMongoDB();

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

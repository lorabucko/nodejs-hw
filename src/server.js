// src/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pinoHttp  from 'pino-http';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(
  pinoHttp({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

// повертає всі нотатки
app.get('/notes', (req, res) => {
  res.status(200).json({
	"message": "Retrieved all notes"
});
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

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

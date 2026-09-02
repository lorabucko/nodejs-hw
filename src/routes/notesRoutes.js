import { Router } from 'express';

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const notesRoutes = Router();

notesRoutes.get('/notes', getAllNotesSchema, getAllNotes);
notesRoutes.get('/notes/:noteId', noteIdSchema, getNoteById);
notesRoutes.post('/notes', createNoteSchema, createNote);
notesRoutes.patch('/notes/:noteId', updateNoteSchema, updateNote);
notesRoutes.delete('/notes/:noteId', noteIdSchema, deleteNote);

export default notesRoutes;

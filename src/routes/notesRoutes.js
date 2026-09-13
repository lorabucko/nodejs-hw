import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';
import {
  createNoteSchema,
  updateNoteSchema,
  noteIdSchema,
  getAllNotesSchema,
} from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const notesRouter = Router();

notesRouter.use(authenticate);

notesRouter.get(
  '/notes',
  celebrate({
    [Segments.QUERY]: getAllNotesSchema,
  }),
  getAllNotes,
);

notesRouter.get(
  '/notes/:noteId',
  celebrate({
    [Segments.PARAMS]: noteIdSchema,
  }),
  getNoteById,
);

notesRouter.post(
  '/notes',
  celebrate({
    [Segments.BODY]: createNoteSchema,
  }),
  createNote,
);

notesRouter.patch(
  '/notes/:noteId',
  celebrate({
    [Segments.PARAMS]: noteIdSchema,
    [Segments.BODY]: updateNoteSchema,
  }),
  updateNote,
);

notesRouter.delete(
  '/notes/:noteId',
  celebrate({
    [Segments.PARAMS]: noteIdSchema,
  }),
  deleteNote,
);

export default notesRouter;

import { Note } from '../models/note.js';

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);

  res.status(201).json(note);
};

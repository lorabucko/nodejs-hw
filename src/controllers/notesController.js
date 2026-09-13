import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const {
      page = 1,
      perPage = 10,
      sortBy,
      sortOrder,
      filter,
      search,
    } = req.query;

    const skip = (Number(page) - 1) * Number(perPage);

    let notesQuery = Note.find().where('userId').equals(userId);

    if (filter?.tag) {
      notesQuery = notesQuery.where('tag').equals(filter.tag);
    }

    if (search) {
      notesQuery = notesQuery.find({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ],
      });
    }

    if (sortBy) {
      notesQuery = notesQuery.sort({
        [sortBy]: sortOrder === 'desc' ? -1 : 1,
      });
    }

    const [notes, totalNotes] = await Promise.all([
      notesQuery.skip(skip).limit(Number(perPage)),
      Note.find()
        .where('userId')
        .equals(userId)
        .find(
          filter?.tag
            ? { tag: filter.tag }
            : {},
        )
        .find(
          search
            ? {
                $or: [
                  { title: { $regex: search, $options: 'i' } },
                  { content: { $regex: search, $options: 'i' } },
                ],
              }
            : {},
        )
        .countDocuments(),
    ]);

    const totalPages = Math.ceil(totalNotes / Number(perPage));

    res.json({
      page: Number(page),
      perPage: Number(perPage),
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { _id: userId } = req.user;

    const note = await Note.findOne({ _id: noteId, userId });

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const note = await Note.create({
      ...req.body,
      userId,
    });

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { _id: userId } = req.user;

    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      req.body,
      { returnDocument: 'after', runValidators: true },
    );

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.json(note);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { _id: userId } = req.user;

    const note = await Note.findOneAndDelete({ _id: noteId, userId });

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

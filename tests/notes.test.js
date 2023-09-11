import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/db.js', () => ({
  insert: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insert, getDB, saveDB } = await import('../src/db.js');
const { newNote, getAllNotes, removeNote } = await import('../src/notes.js');

beforeEach(() => {
  insert.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
})

test('newNote inserts data and returns it', async () => {
    const note = 'Go to School';
    const tags = ['books', 'lunch'];
    const result = await newNote(note, tags);
    const data = {
      tags,
      content: note,
      id: result.id,
    };
    insert.mockResolvedValue(data);
    expect(result).toEqual(data);
  });

  test('getAllNotes returns all notes', async () => {
    const db = {
      notes: ['Biking', 'Fishing', 'Coding']
    };
    getDB.mockResolvedValue(db);
  
    const result = await getAllNotes();
    expect(result).toEqual(db.notes);
  });
  
  test('removeNote does nothing if id is not found', async () => {
    const notes = [
      { id: 1, content: 'Biking' },
      { id: 2, content: 'Fishing' },
      { id: 3, content: 'Cooking' },
    ];
    saveDB.mockResolvedValue(notes);
  
    const idToRemove = 4;
    const result = await removeNote(idToRemove);
    expect(result).toBeUndefined();
  });
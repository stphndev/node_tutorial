import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const DB_FILE_NAME = 'db.json';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const DB_PATH = path.resolve(__dirname, '..', DB_FILE_NAME);

export const getDB = async () => {
  try {
    const db = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(db);
  } catch (error) {
    throw error;
  }
};

export const saveDB = async (db) => {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
    return db;
  } catch (error) {
    throw error;
  }
};

export const insert = async (data) => {
  try {
    const db = await getDB();
    db.notes.push(data);
    await saveDB(db);
    return data;
  } catch (error) {
    throw error;
  }
};
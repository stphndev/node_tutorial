import { insert, getDB, saveDB } from './db.js'

export const newNote = async (note: string, tags: string[]) => {
  const data = {
    tags,
    id: Date.now(),
    content: note,
  }
  await insert(data)
  return data
}
export const getAllNotes = async () => {
  const db = await getDB()
  return db.notes
}

export const findNotes = async (filter: string) => {
  const notes = await getAllNotes()
  return notes.filter((note: { content: string }) => note.content.toLowerCase().includes(filter.toLowerCase()))
}

export const removeNote = async (id: number) => {
  const notes = await getAllNotes()
  const match = notes.find((note: { id: number }) => note.id === id)

  if (match) {
    const newNotes = notes.filter((note: { id: number }) => note.id !== id)
    await saveDB({notes: newNotes})
    return id
  }
}

export const removeAllNotes = async () => {
  await saveDB({notes: []})
}
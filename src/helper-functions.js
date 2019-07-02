export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === parseInt(folderId))

export const findNote = (notes=[], noteId) => 
  notes.find(note => note.id === parseInt(noteId))

export const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folderId === folderId)
)

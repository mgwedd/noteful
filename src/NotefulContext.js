import React from 'react';

export const NotefulContext = React.createContext({
    notes: [],
    folders: [],
    addFolder: () => {},
    addNote: () => {},
    deleteNote: () => {},
});
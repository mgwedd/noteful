import React from 'react';

export const NotefulContext = React.createContext({
    notes: ['defaultContext'],
    folders: ['defaultContext'],
    addFolder: () => {},
    addNote: () => {},
    deleteNote: () => {},
});
import React from 'react';
import Note from '../Note/Note';
import { getNotesForFolder } from '../../helper-functions';

export default function NoteList( props ) {
    const { data, selectedFolder } = props;
    const notes = [];
    if ( selectedFolder )
        notes.push(getNotesForFolder( data.notes, selectedFolder ));
    else
        notes.push(data.notes);
    return (
        <>
            { notes.map( ( note ) => <Note { ...props } /> ) }
        </>
    );
}

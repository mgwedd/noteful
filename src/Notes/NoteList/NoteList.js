import React from 'react';
import Note from '../Note/Note';
import { getNotesForFolder } from '../../helper-functions';

export default function NoteList( props ) {
    const { data, selectedFolder } = props;
    const notesToRender = [];

    if ( selectedFolder )
        notesToRender.push(getNotesForFolder( data.notes, selectedFolder ));
    else
        notesToRender.push(data.notes);
        
    const notes = notesToRender.map(( note ) => {
        return <Note 
                { ...props } 
                key={ note.id }/>
    });
    
    return (
        <>
            <ul>
                { notes }
            </ul>
        </>
    );
}

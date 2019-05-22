import React from 'react';
import Note from '../Note/Note';
import { getNotesForFolder } from '../../helper-functions';

export default function NoteList( props ) {
    const { data, match } = props;
    const folderId = match.params.folderId;
    let notesToRender;
    if ( folderId )
        notesToRender = ( getNotesForFolder( data.notes, folderId ) );
    else
        notesToRender = ( data.notes );

    const notes = notesToRender.map( ( note, index ) => {
        return <Note 
                { ...props } 
                note={ note }
                key={ index }/>
    });
    
    return (
        <>
            <ul>
                { notes }
            </ul>
        </>
    );
}

import React from 'react';
import Note from '../Note/Note';
import { getNotesForFolder } from '../../helper-functions';

export default function NoteList( props ) {
    const { data, selectedFolder } = props;
    // let notesToRender;
    // if ( selectedFolder )
    //     notesToRender = (getNotesForFolder( data.notes, selectedFolder ));
    // else
    //     notesToRender = (data.notes);
    const notes = data.notes.map( ( note, index ) => {
        return <Note 
                { ...props } 
                note={ note }
                key={ index }/>
    });
    
    return (
        <>
            <div className="notelist_container">
                <ul>
                    { notes }
                </ul>
            </div>
        </>
    );
}

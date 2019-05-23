import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Button from '../../Button/Button';
import { findNote } from '../../helper-functions';
import { NotefulContext } from '../../NotefulContext';
import './Note.css'

function Note( props ) {

    const { note, handleDeleteNote, match, data } = props;
    // if the location path isn't targeting a specific note, render a standard note overview; 
    // otherwise, render that overview with a content box below it

    // in case this component was called from Main without NoteList, for an individual note, 
    // get a note matching the route path (noteId)
    let noteToRender;
    if ( !note ) {
        noteToRender = findNote(data.notes, match.params.noteId);
    } else {
        noteToRender = note;
    }
    const standardNote = (
        <li className="note_container_li">
            <div className="note_title-and-date-wrapper">
                <Link
                    to={ `/note/${ noteToRender.id }` }>
                    { <h2>{ noteToRender.name} </h2> }
                </Link>
                <span className="note_modified_date"> 
                    Modified 
                    {' '}
                    {format(noteToRender.modified, 'Do MMM YYYY')} 
                </span>
            </div>
            <div className="note_delete-button-wrapper">
                <Button 
                    name="Delete Note"
                    destination="destination="
                    className="delete_note_button"
                    buttonHandler={ handleDeleteNote }>
                    Delete
                </Button>
            </div>
        </li>
    );
    if ( !match.params.noteId ) {
        return [ standardNote ];
    } else {     
        return (
            <>
                <div className="note_content_container">
                    { standardNote }
                   <p className="note_content">{ noteToRender.content }</p>  
                </div>
            </>
        );  
    }
}

export default function NoteWithContext( props ) {
    return (
        <>
            <NotefulContext.Consumer />
                { ( contextData ) => <Note { ...contextData } />}
            <NotefulContext.Consumer />
        </>
    );
}
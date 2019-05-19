import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'

export default function Note( props ) {

    // TODO: The way Location is being passed down is probably not idiomatic, and probably doesn't work. 
    // ask Nathaniel how this works. We want to return one of two things based on which route location we're at.
    const { note, location, handleDeleteNote } = props;
    const standardNote = (
            <div className="note_container">
                <div className="note_title-and-date-wrapper">
                    <Link
                        to={`Note/${note.id}`}>
                        <h2 className="note_title"> 
                            { note.title }
                        </h2>
                    </Link>
                    <span className="note_modified"> 
                        Modified 
                        {' '}
                        {format(note.modified, 'Do MMM YYYY')} 
                    </span>
                </div>
                <div classname="note_delete-button-wrapper">
                    <button 
                        className="note_delete-button"
                        onClick={ event => handleDeleteNote(event) }>
                        Delete
                    </button>
                </div>
            </div>
    );  
    // if the location path isn't targeting a specific note, render a standard note overview; 
    // otherwise, render that overview with a content box below it
    if (location !== `/note/${note.id}`) 
        return { standardNote };
    else {     
        return (
            <>
                { standardNote }
                <div className="note_content">
                    { note.content }
                </div>
            </>
        );  
    }
}
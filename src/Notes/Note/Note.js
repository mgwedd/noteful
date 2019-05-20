import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Button from '../../Button/Button';
import './Note.css'

export default function Note( props ) {

    // TODO: The way Location is being passed down is probably not idiomatic, and probably doesn't work. 
    // ask Nathaniel how this works. We want to return one of two things based on which route location we're at.
    const { note, location, handleDeleteNote } = props;
    const standardNote = (
            <li className="note_container_li">
                <div className="note_title-and-date-wrapper">
                    <Link
                        to={`Note/${note.id}`}>
                        <h2 className="note_title"> 
                            { note.title }
                        </h2>
                    </Link>
                    <span className="note_modified_date"> 
                        Modified 
                        {' '}
                        {format(note.modified, 'Do MMM YYYY')} 
                    </span>
                </div>
                <div classname="note_delete-button-wrapper">
                    <Button 
                        name="Delete Note"
                        className="delete_note_button"
                        destination={ null } 
                        // QUESTION: Is it ok to pass null to a <Link/> so that handleDeleteNote manages its functionality ?
                        onClick={ handleDeleteNote }>
                        Delete
                    </Button>
                </div>
            </li>
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

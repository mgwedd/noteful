import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Button from '../../Button/Button';
import './Note.css'

// PROBLEM WITH SINGLE NOTE ROUTE Do data fetching from data source here being given a noteId. THe problem is on the note route, 
// where no note object i sbeing passed form notelist. 

export default function Note( props ) {

    // TODO: The way Location is being passed down is probably not idiomatic, and probably doesn't work. 
    // ask Nathaniel how this works. We want to return one of two things based on which route location we're at.
    const { note, handleDeleteNote, match } = props;
    // console.log('this is note from Note ', note[0])            
    // if the location path isn't targeting a specific note, render a standard note overview; 
    // otherwise, render that overview with a content box below it
    const standardNote = (
        <li className="note_container_li">
            <div className="note_title-and-date-wrapper">
                <Link
                    to={ `/note/${ note.id }` }>
                    { <h2>{ note.name} </h2> }
                </Link>
                <span className="note_modified_date"> 
                    Modified 
                    {' '}
                    {format(note.modified, 'Do MMM YYYY')} 
                </span>
            </div>
            <div className="note_delete-button-wrapper">
                <Button 
                    name="Delete Note"
                    className="delete_note_button"
                    destination={ '' } 
                    // QUESTION: Is it ok to pass null to a <Link/> so that handleDeleteNote manages its functionality ?
                    onClick={ handleDeleteNote }>
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
               { standardNote }
                <div className="note_content">
                    { note.content }
                </div>
            </>
        );  
    }
}

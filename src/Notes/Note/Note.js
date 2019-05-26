import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { findNote } from '../../helper-functions';
import { NotefulContext } from '../../NotefulContext';
import Button from '../../Button/Button';
import './Note.css'

export default class Note extends Component {
        
    // In case there's no folder selected, to avoid undef error when destructuring it for the note pull.
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = NotefulContext;

    render(){
        const { note, match } = this.props;
        const { notes } = this.context;
        // uuid because buttons aren't generated with easy access to an index key
        const uuidv1 = require('uuid/v1'); 
        // in case this component was called from Main without NoteList, for an individual note, 
        // get a note matching the route path of the note (the noteId, which is equal to note.id)
        let noteToRender;
        if ( !note ) {
            noteToRender = findNote(notes, match.params.noteId);
        } else {
            noteToRender = note;
        }
        const standardNote = (
            <li className="note_container_li">
                <div className="note_title-and-date-wrapper">
                    <Link
                        to={ `/note/${ noteToRender.id }` }>
                        { <h2>{ noteToRender.name }</h2> }
                    </Link>
                    <span className="note_modified_date"> 
                        Modified 
                        {' '}
                        { format( noteToRender.modified, 'Do MMM YYYY') } 
                    </span>
                </div>
                <div className="note_delete-button-wrapper">
                    <Button 
                        name="Delete Note"
                        destination="destination="
                        className="delete_note_button"
                        key={ uuidv1() }>
                        Delete
                    </Button>
                </div>
            </li>
        );

        // if the path isn't targeting a specific note, render a standard note overview; 
        if ( !match.params.noteId ) {
            return [ standardNote ];
        // otherwise, render that overview with a note content box below it
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
}

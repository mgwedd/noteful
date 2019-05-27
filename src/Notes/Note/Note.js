import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import { findNote } from '../../helper-functions';
import { NotefulContext } from '../../NotefulContext';
import config from '../../config';
import './Note.css';

class Note extends Component {
        
    // In case there's no folder selected, to avoid undef error when destructuring it for the note pull.
    static defaultProps = {
        match: {
            params: {},  
        }
    }
    
    static contextType = NotefulContext;
    
    handleDeleteNoteClick = ( deleteEvent ) => {
        deleteEvent.preventDefault();
        let noteId;
        if ( !this.props.match.params.noteId ) {
            noteId = this.props.noteId;
        }
        else {
            noteId = this.props.match.params.noteId
        }
        // const { noteId } = !this.props.match.params ? this.props: this.props.match.params; ALT, would need work.
        const { history } = this.props;
        const { deleteNote } = this.context;
        fetch(`${ config.API_ENDPOINT }/notes/${ noteId }`, {
            method: 'DELETE',
            headers: {
            'content-type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok)
                return response.json().then(badResponse => Promise.reject(badResponse));
            return response.json();
        })
        .then(() => {
            history.push('/');
            deleteNote( noteId );
        })
        .catch(error => {
            console.error({ error });
        })
    }

    render(){
        const { note, match } = this.props;
        const { notes } = this.context;
        // in case this component was called from Main without NoteList, for an individual note, 
        // get a note matching the route path of the note (the noteId, which is equal to note.id)
        let noteToRender;
        if ( !note ) {
            noteToRender = findNote( notes, match.params.noteId );
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
                    <button 
                        name="Delete Note"
                        className="delete_note_button"
                        onClick={ event => this.handleDeleteNoteClick( event ) }>
                        Delete Note
                    </button>
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

export default withRouter(Note);
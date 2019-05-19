import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'

export default function Note( props ) {
    const { note, path } = props;
    
    // if path is not a specific note, render the note overview view.
    if (path !== '/note') {
        return (
            <>
                <div className="note_container">
                    <Link>
                        <h2 className="note_title"> 
                            { note.title }
                        </h2>
                    </Link>
                    <span className="note_modified"></span>
                </div>
            </>
        );  
    } else {

    }
    // if path is /note/:noteId, then render the full note content etc. 
}
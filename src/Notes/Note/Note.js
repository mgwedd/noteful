import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { findNote } from '../../helper-functions'
import { NotefulContext } from '../../NotefulContext'

class Note extends Component {
    
    // In case there's no folder selected, to avoid undef error when destructuring it for the note pull.
    static defaultProps = {
        match: {
            params: {},  
        }
    }
    
    static contextType = NotefulContext
    
    handleDeleteNoteClick = async ( deleteEvent ) => {
        deleteEvent.preventDefault()
        const { history } = this.props
        const { createApiInterface, deleteNote } = this.context
        
        // we may be deleting from both the list and single note views, so handle both cases.
        let noteId
        if ( !this.props.match.params.noteId ) {
            noteId = this.props.noteId
        } else {
            noteId = this.props.match.params.noteId
        }
        
        this.ApiInterface = createApiInterface( {
            method : 'DELETE', 
            endpoint: 'note', 
            resourceId : noteId
        } )

        // delete the note from the db
        this.ApiInterface.goFetch()

        // delete the note from App's state
        deleteNote( noteId )
        
        // take us home
        history.push('/')
    }

    render(){
        const { note, match } = this.props
        const { notes } = this.context
        console.log('this is the passed down notes before rendering a note', notes, 'and heres a single note from props, ', note)
        // in case this component was called from Main without NoteList, for an individual note, 
        // get a note matching the route path of the note (the noteId, which is equal to note.id)
        let noteToRender = 'DEFAULT NOTE TO RENDER VAL'

        if ( !note ) {
            noteToRender = findNote( notes, match.params.noteId )
            console.log('just used the findNote function and found: ', noteToRender)
        } else {
            noteToRender = note
        }

        console.log('note to render below conditional', noteToRender)

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
        )

        // if the path isn't targeting a specific note, render a standard note overview; 
        if ( !match.params.noteId ) {
            return [ standardNote ]
        // otherwise, render that overview with a note content box below it
        } else {     
            return (
                <>
                    <div className="note_content_container">
                        { standardNote }
                        <p className="note_content">{ noteToRender.content }</p>  
                    </div>
                </>
            )  
        }
    }
}

// These props are not required because there are two ways to instantiate a note; each takes a different prop.
Note.propTypes = {
    note: PropTypes.object, 
    noteId: PropTypes.string
};

export default withRouter( Note )
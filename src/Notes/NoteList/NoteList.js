import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Note from '../Note/Note'
import { NotefulContext } from '../../NotefulContext'
import { getNotesForFolder } from '../../helper-functions'
const uuid = require('uuid/v4')

export default class NoteList extends Component {
    
    static defaultProps = {
        match: {
            params: {}
        }
    }
    
    static contextType = NotefulContext

    render() {
        const { folderId } = this.props.match.params
        const { notes=['noNotes from context in NoteList'] } = this.context
        const notesForFolder = getNotesForFolder( notes, folderId )
        const notesList = notesForFolder.map( ( note ) => {
            return <Note 
                note={ note }
                key={ uuid() }
                noteId={ note.id } />
        })

        return (
            <>
                <ul>
                    { notesList }
                    <li key={ uuid() }>
                        <NavLink 
                            to="/add-note"
                            key={ uuid() }
                            className="add_note_button"
                            activeClassName="selected">
                            Add Note   
                        </NavLink>
                    </li>
                </ul>
            </>
        )
    }
}

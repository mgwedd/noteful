import React from 'react'
import { NavLink } from 'react-router-dom'

import Note from '../Note/Note'

const uuid = require('uuid/v4')

export default function AllNotes( props ) {
    const { notes } = props
    const addNoteButton = (
        <NavLink 
            to="/add-note"
            key={ uuid() }
            className="add_note_button"
            activeClassName="selected">
            Add Note   
        </NavLink> 
    )
    const allNotes = notes.map( ( note ) => { 
        return <Note 
            note={ note }
            key={ uuid() }
            noteId={ note.id } /> 
    } )

    return <>
            {allNotes}
            {addNoteButton}
        </>
}
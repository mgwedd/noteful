import React from 'react'
import Note from '../Note/Note'

const uuid = require('uuid/v4')

export default function AllNotes( props ) {
    const { notes } = props
    return notes.map( ( note ) => { 
        return <Note 
            note={ note }
            key={ uuid() }
            noteId={ note.id } /> 
        })
}
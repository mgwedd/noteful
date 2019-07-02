import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Note from '../Note/Note'
import { NotefulContext } from '../../NotefulContext'
const uuid = require('uuid/v4')

export default class NoteList extends Component {
    
    static defaultProps = {
        match: {
            params: {}
        }
    }
    
    static contextType = NotefulContext

    constructor( props ) {
        super( props )
        this.state = {
            notesForFolder : [], 
            currentFolderId : ''
        }
    }

    getNotesForFolder = async ( folderId ) => {

        const { createApiInterface } = this.context

        this.getNotesForFolderInterface = createApiInterface({
            method : 'GET', 
            endpoint : 'folder', 
            resourceId : folderId
        })

        const folderAndItsNotes = await this.getNotesForFolderInterface.goFetch()
        const notesForFolder = folderAndItsNotes.notes

        console.log('setting state in interface with ', notesForFolder )
        this.setState( { notesForFolder, currentFolderId : folderId } )
    }

    render() {
        const { notes=['no notes from context in NoteList'] } = this.context
        const { notesForFolder, currentFolderId } = this.state
        const { folderId } = this.props.match.params

        let notesToRender = notes
        
        if ( notesForFolder.length ) {
            console.log('Rendering an array of notes for the folder from state >> ', notesForFolder)
            notesToRender = notesForFolder
        } 
        
        if ( folderId && folderId !== currentFolderId ) {
            console.log('FolderID evaluated to true >> ', folderId)
            this.getNotesForFolder( folderId )
            notesToRender = notes
        } 

        const notesList = notesToRender.map( ( note ) => {
            // console.log(' About to generate a note component with this note data >> ', note )
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

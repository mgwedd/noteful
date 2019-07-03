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

        this.setState( { notesForFolder, currentFolderId : folderId } )
    }

    render() {
        const { notes=['no notes from context in NoteList'] } = this.context
        const { notesForFolder, currentFolderId } = this.state
        const { folderId } = this.props.match.params

        let notesToRender = notes
        
        if ( notesForFolder.length ) {
            notesToRender = notesForFolder
        } 
        
        if ( folderId && folderId !== currentFolderId ) {
            // we need to get some notes for this folder, but in the meantime while fetching, render the whole list.
            this.getNotesForFolder( folderId )
            notesToRender = notes
        } 

        const notesList = notesToRender.map( ( note ) => {
            return <Note 
                note={ note }
                key={ uuid() }
                noteId={ note.id } />
        })

        const editFolderButton = (
            <NavLink 
                to={{
                    pathname: '/edit-folder',
                    state: { currentFolderId }
                }}
                key={ uuid() }
                className="edit_folder_button"
                activeClassName="selected">
                Edit Folder   
            </NavLink>
        )

        return (
            <>
                <ul>
                    { notesList }
                    <li key={ uuid() }>
                        <div className="add_note_edit_folder_container">
                            <NavLink 
                                to="/add-note"
                                key={ uuid() }
                                className="add_note_button"
                                activeClassName="selected">
                                Add Note   
                            </NavLink>
                            {currentFolderId !== '' ? editFolderButton : null}
                        </div>
                    </li>
                </ul>
            </>
        )
    }
}

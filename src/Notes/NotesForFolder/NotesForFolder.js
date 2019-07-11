import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import Note from '../Note/Note'
import NoNotes from '../NoNotes/NoNotes'

import { NotefulContext } from '../../NotefulContext'

const uuid = require('uuid/v4')

export default class NotesForFolder extends Component {
    
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = NotefulContext

    constructor( props ) {
        super( props ) 
        this.state({

        })
    }

    onDeleteFolder  = async () => {
        const { folderId } = this.state
        const { createApiInterface, deleteFolder } = this.context
        const { history } = this.props

        this.deleteFolderInterface = createApiInterface(
            {
                method : 'DELETE', 
                endpoint : 'folder', 
                resourceId : folderId
            }
        )

        // delete folder from the db
        await this.deleteFolderInterface.goFetch()

        // delete folder from the apps state
        deleteFolder( folderId )

        // take us home.
        history.push('/')
    }

    generateHeaderMessage = () => {

        const { noNotesFound, currentFolder } = this.state

        let message

        if ( noNotesFound ) {
            message = `No notes found in ${currentFolder.name}`
        } else {
            message = currentFolder.name 
        }


        return (
            <div className="folderHeaderWrapper">
                <div className="folderTitleBorder">
                    <h2 className="folderTitle">{message}</h2>
                </div>
            </div>
        )
    }

    generateFolderButtons = () => {

        const { currentFolder } = this.state

        const editFolderButton = (
            <NavLink 
                to={{
                    pathname: '/edit-folder',
                    state: { currentFolder }
                }}
                key={ uuid() }
                className="edit_folder_button"
                activeClassName="selected">
                Edit Folder   
            </NavLink>
        )
        
        const addNoteButton = (
            <NavLink 
                to="/add-note"
                key={ uuid() }
                className="add_note_button"
                activeClassName="selected">
                Add Note   
            </NavLink>
        )

        const deleteFolderButton = (
            <button
                className="delete_folder_button"
                onClick={this.onDeleteFolder}>
                Delete Folder
            </button>  
        )
        return [addNoteButton, editFolderButton, deleteFolderButton]
    }

    getNotesForFolder = () => {

        const { currentFolder } = this.state
        const { notes } = this.context

        const notesForFolder = notes.filter( note => note.folderid === currentFolder.id )

        if ( !notesForFolder.length ) {
            return <NoNotes />
        } 

        return notes.map( ( note ) => {
            return <Note 
                note={ note }
                key={ uuid() }
                noteId={ note.id } /> 
            })
    }

    render() { 

        const folderHeader = this.generateHeaderMessage()

        const folderButtons = this.generateFolderButtons()

        const notesForFolder = this.getNotesForFolder()

        return (
            <>
                {folderHeader}
                {notesForFolder}
                <div className="add_note_edit_delete_folder_container">
                    { folderButtons }     
                </div>
            </>
        )
    }
}
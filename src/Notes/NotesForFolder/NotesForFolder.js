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
        this.state = {
            currentFolder : '', 
            folderId : '',
            noNotesFound : true
        }
    }

    onDeleteFolder  = async () => {
        const { currentFolder : { id } } = this.state
        const { createApiInterface, deleteFolder } = this.context

        this.deleteFolderInterface = createApiInterface(
            {
                method : 'DELETE', 
                endpoint : 'folder', 
                resourceId : id
            }
        )

        // delete folder from the db
        await this.deleteFolderInterface.goFetch()

        // delete folder from the apps state
        deleteFolder( id )
    }

    generateHeaderMessage = () => {

        const { currentFolder } = this.state

        return (
            <div className="folderHeaderWrapper">
                <div className="folderTitleBorder">
                    <h2 className="folderTitle">{currentFolder && currentFolder.name}</h2>
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
        const { notes, folders } = this.context
        const { folderId } = this.props.match.params

        const currentFolder = folders.find( folder => folder.id === parseInt( folderId ) )
        const notesForFolder = notes.filter( note => note.folderid === currentFolder.id )

        // if we just navigated to a new folder or we havent yet added the current folder to the state, then add both.
        // essentially, set the components state to be in line with "the folder" we're in as the user moves around.
        if ( this.props.match.params.folderId !== this.state.folderId || !this.state.currentFolder ) {
            this.setState( {
                folderId : this.props.match.params.folderId, 
                noNotesFound : false, 
                currentFolder
            } )
        }

        if ( !notesForFolder.length ) {
            return <NoNotes />
        } 

        return notesForFolder.map( ( note ) => {
            return <Note 
                note={ note }
                key={ uuid() }
                noteId={ note.id } /> 
            } )
    }

    render() { 

        const notesForFolder = this.getNotesForFolder()
        const folderHeader = this.generateHeaderMessage()
        const folderButtons = this.generateFolderButtons()

        return (
            <>
                {folderHeader}
                {notesForFolder}
                <div className="folderButtonsHolder">
                    { folderButtons }     
                </div>
            </>
        )
    }
}
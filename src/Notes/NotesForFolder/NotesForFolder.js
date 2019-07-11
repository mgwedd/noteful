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
            currentFolder : null, 
            noNotesFound : true
        }
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

        const { currentFolder } = this.state

        return (
            <div className="folderHeaderWrapper">
                <div className="folderTitleBorder">
                    <h2 className="folderTitle">{currentFolder && currentFolder.name }</h2>
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

        const currentFolder = folders.find( folder => folder.id === parseInt( this.props.match.params.folderId ) )
        console.log('currentFolder', currentFolder)
        const notesForFolder = notes.filter( note => note.folderid === currentFolder.id )
        console.log('notes', notes, 'notesForFolder', notesForFolder)
  
        if ( !notesForFolder.length ) {
            return <NoNotes />
        } 

        if ( !this.state.currentFolder ) {
            this.setState( {
                noNotesFound : false, 
                currentFolder
            } )
        }

        return notesForFolder.map( ( note ) => {
            return <Note 
                note={ note }
                key={ uuid() }
                noteId={ note.id } /> 
            })
    }

    render() { 
        console.log('IN NOTES FOR FOLDER')

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
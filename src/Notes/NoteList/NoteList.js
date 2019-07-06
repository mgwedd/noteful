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

    componentDidUpdate(prevProps) {
        // this logic wipes the folder-specific notes from state when you navigate away from a folder route. 
        if (this.props.location !== prevProps.location) {
            this.setState({
                notesForFolder : [], 
                currentFolderId : ''
            })
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
        const notesForFolder = folderAndItsNotes.notes // { folder : {...}, notes : [...]}
        this.setState( { notesForFolder, currentFolderId : folderId } )
    }

    onDeleteFolder  = async () => {
        const { currentFolderId : folderId } = this.state
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

        const deleteFolderButton = (
            <button
                className="delete_folder_button"
                onClick={this.onDeleteFolder}>
                Delete Folder
            </button>  
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
                            { currentFolderId !== '' ? [editFolderButton, deleteFolderButton] : null}     
                        </div>
                    </li>
                </ul>
            </>
        )
    }
}

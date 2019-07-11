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
            currentFolder : {},
            currentFolderId : '', 
            loading : false
        }
    }

    componentDidUpdate(prevProps) {
        // this logic wipes the folder-specific notes from state when you navigate away from a folder route. 
        if (this.props.location !== prevProps.location) {
            this.setState({
                notesForFolder : [], 
                currentFolder : {},
                currentFolderId : '', 
                noNotesFound : false,
                loading : false 
            })
        }
    }

    loadNotes = ( folderId ) => {
        this.setState( {
            loading: true
        })

        this.getNotesForFolder( folderId )
    }
    
    getNotesForFolder = async ( folderId ) => {

        const { createApiInterface } = this.context

        this.getNotesForFolderInterface = createApiInterface({
            method : 'GET', 
            endpoint : 'folder', 
            resourceId : folderId
        })

        const folderAndItsNotes = await this.getNotesForFolderInterface.goFetch() // { folder : {...}, notes : [...]}
        
        let noNotesFound
        if ( !folderAndItsNotes.notes.length ) {
            noNotesFound = true
        }

        this.setState( { 
            notesForFolder : folderAndItsNotes.notes,
            currentFolder : folderAndItsNotes.folder,
            currentFolderId : folderId, 
            loading : false, 
            noNotesFound
        } )
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
        const { notes=['no notes'] } = this.context
        const { notesForFolder, currentFolder, currentFolderId, loading, noNotesFound } = this.state
        const { folderId } = this.props.match.params
        let notesToRender = []

        if ( !loading && notesForFolder.length ) {
            // we have notes for the folder, so render them
            notesToRender = notesForFolder
        } 
        
        if ( !loading && !notesForFolder.length && folderId ) {
            // we need notes for this folder
            this.loadNotes( folderId )
        } 

        if ( !loading && !notesForFolder.length && !folderId) {
            // render all notes for this route.
            notesToRender = notes
        }

        let folderHeader = null
        if ( currentFolder !== {} ) {
            // we need a header for this folder: loading or the folder name

            const headerMessage = () => {
                if ( noNotesFound ) {
                    return `No notes found in ${currentFolder.name}`
                } else if ( loading ) {
                    return 'Loading...'
                } else {
                    return currentFolder.name 
                }
            }
            
            folderHeader = (
                <div className="folderHeaderWrapper" >
                    <div className="folderTitleBorder">
                        <h2 className="folderTitle">{headerMessage()}</h2>
                    </div>
                </div>
            )
        }

        const notesList = notesToRender.map( ( note ) => {
            // give us the notes.
            return <Note 
                note={ note }
                key={ uuid() }
                noteId={ note.id } />
        } )

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
                { folderId && folderHeader }
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

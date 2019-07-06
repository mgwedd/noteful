import React, { Component } from 'react'
import { NotefulContext } from './NotefulContext'
import NotefulErrorBoundary from './NotefulErrorBoundary'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import Main from './Main/Main'
import ApiInterface from './API/ApiInterface'
import './App.css'

export default class App extends Component {

  constructor ( props ) {
    super(props)
    this.state = {
      notes: [],
      folders: []
    }
    this.getAllNotes = this.createApiInterface({method:'GET', endpoint: 'note'})
    this.getAllFolders = this.createApiInterface({method:'GET', endpoint: 'folder'})
  }

  
  addNote = ( note, history = this.state.notes ) => {
    this.setState({
      notes: [
        ...history, 
        note
      ]
    })
  }

  updateNote = ( updatedNote ) => {
    const unchangedNotes = this.state.notes.filter( note => note.id !== updatedNote.id)
    this.addNote(updatedNote, unchangedNotes )
  }

  deleteNote = ( noteId ) => {
    console.log('deleting note from state : ', noteId)
    this.setState({
      notes: this.state.notes.filter(note => note.id !== parseInt(noteId))
    });
  }

  addFolder = ( folder, history = this.state.folders ) => {
    this.setState({
      folders: [
        ...history, 
        folder
      ]
    })
  }

  getFolderToEdit = ( folderId ) => {
    return this.state.folders.find( folder => folder.id === parseInt( folderId ) ) || 'Not Found'
  }

  updateFolder = ( updatedFolder ) => {
    const unchangedFolders = this.state.folders.filter( folder => folder.id !== updatedFolder.id)
    this.addFolder(updatedFolder, unchangedFolders )
  }

  createApiInterface = options => new ApiInterface( options )

  getAllData = async () => {
    const notes = await this.getAllNotes.goFetch()
    const folders = await this.getAllFolders.goFetch()
    this.setState( {notes, folders} )
  }

  componentDidMount() {
    this.getAllData()
  }

  render() {
    const contextValue = {
      notes : this.state.notes, 
      folders : this.state.folders,
      addNote : this.addNote, 
      updateNote : this.updateNote,
      deleteNote : this.deleteNote, 
      addFolder : this.addFolder,
      getFolderToEdit : this.getFolderToEdit,
      updateFolder : this.updateFolder,
      createApiInterface : this.createApiInterface
    }

    return (
      <>
        <Header />
        <NotefulContext.Provider value={contextValue}>
          <div className="sidebar_and_main_container">
            <div className="sidebar_container">
            <NotefulErrorBoundary>
              <Sidebar />
            </NotefulErrorBoundary>
            </div>
            <div className="main_container">
            <NotefulErrorBoundary>
              <Main />
            </NotefulErrorBoundary>
            </div>
          </div>
        </NotefulContext.Provider>
      </>
     )
  }
}

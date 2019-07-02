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

  deleteNote = ( noteId ) => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }

  addNote = ( note ) => {
    this.setState({
      notes: [
        ...this.state.notes, 
        note
      ]
    })
  }

  addFolder = ( folder ) => {
    this.setState({
      folders: [
        ...this.state.folders, 
        folder
      ]
    })
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
      notes: this.state.notes, 
      folders: this.state.folders,
      deleteNote: this.deleteNote, 
      addNote: this.addNote, 
      addFolder: this.addFolder,
      createApiInterface: this.createApiInterface
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

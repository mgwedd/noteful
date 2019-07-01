import React, { Component } from 'react';
import { NotefulContext } from './NotefulContext';
import NotefulErrorBoundary from './NotefulErrorBoundary';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import config from './config';
import './App.css';

async function apiInterface( method = 'GET', endpoint = 'note', resourceId = false, body = false ) {
  let requestEndpoint = `${config.API_BASE}/${endpoint}`
  
  if ( resourceId ) {
    requestEndpoint += `/${resourceId}`
  }

  const request = {
    method,
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${config.API_TOKEN}`
    }
  }

  if ( body ) {
    request.body = JSON.stringify( body )
  }

  try {
    return await fetch( requestEndpoint, request )
      .then( res => {
        if ( !res.ok ) {
          return res
            .json()
            .then( error => {
              throw error
            })
        }
        return res.json()
      })
      .then( resolvedResponse => {
        console.log('about to resolve with: ', resolvedResponse)
        return resolvedResponse
      })
  }
  catch( err ) {
    return `API Interface Error: ${err.message}`
  }
}

export default class App extends Component {

  state = {
    notes: [],
    folders: []
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
    });
  }

  addFolder = ( folder ) => {
    this.setState({
      folders: [
        ...this.state.folders, 
        folder
      ]
    });
  }
 
  componentDidMount() {
    const notes = apiInterface('GET', 'note')
    console.log('component mounted with these new note results: ', notes)
    // const folders = apiInterface('GET', 'folder')

    if (typeof notes !== 'string') {
      this.setState( {notes : notes} )
    } else {
      console.log(`ERROR ON INITIAL FETCH: ${notes}`)
    }

    // if (typeof folders !== 'string') {
    //   this.setState( {...folders} )
    // } else {
    //   console.log(`ERROR ON INITIAL FETCH: ${folders}`)
    // }
  }

  render() {
    const contextValue = {
      notes: this.state.notes, 
      folders: this.state.folders,
      deleteNote: this.deleteNote, 
      addNote: this.addNote, 
      addFolder: this.addFolder,
    };

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
     );
  }
}

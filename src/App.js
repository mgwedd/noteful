import React, { Component } from 'react';
import { NotefulContext } from './NotefulContext';
import NotefulErrorBoundary from './NotefulErrorBoundary';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import config from './config';
import './App.css';

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
    Promise.all([
      fetch(`${ config.API_ENDPOINT }/notes`),
      fetch(`${ config.API_ENDPOINT }/folders`)
    ])
    .then(([notesRes, foldersRes]) => {
      if (!notesRes.ok)
        return notesRes.json().then(badNotesResponse => Promise.reject(badNotesResponse));
      if (!foldersRes.ok)
        return foldersRes.json().then(badFoldersResponse => Promise.reject(badFoldersResponse));
        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });
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
        <NotefulContext.Provider value={ contextValue }>
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

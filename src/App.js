import React, { Component } from 'react';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import sampleData from './sampleData';
import { NotefulContext } from './NotefulContext';
import './App.css';

export default class App extends Component {

  state= {
    data: sampleData
  }

  handleDeleteNote = ( noteId, folderId ) => {
    // delete note from this.state.notes.
  }

  handleAddNote = ( noteId, folderId) => {
    // add note to this.state.notes.
  }

  handleAddFolder = ( formSubmission ) => {
    // add folder to this.state.folders.
  }

  render() {
    const contextValue = {
      data: this.state.data, 
      handleDeleteNote: this.handleDeleteNote, 
      handleAddNote: this.handleAddNote, 
      handleAddFolder: this.handleAddFolder,
    }
    return (
      <>
      <Header />
        <NotefulContext.Provider value={ contextValue } />
          <div className="sidebar_and_main_container">
            <div className="sidebar_container">
              <Sidebar />
            </div>
            <div className="main_container">
              <Main />
            </div>
          </div>
        <NotefulContext.Provider />
      </>
     );
  }
}

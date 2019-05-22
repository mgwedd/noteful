import React, { Component } from 'react';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import sampleData from './sampleData';
import './App.css';

export default class App extends Component {

  state= {
    selectedNote: false, 
    selectedFolder: false, 
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
    return (
      <>
        <Header />
        <div className="sidebar_and_main_container">
          <div className="sidebar_container">
            <Sidebar 
              { ...this.state }
              handleAddFolder={ this.handleAddFolder } />
          </div>
          <div className="main_container">
            <Main 
              { ...this.state }
              handleAddNote={ this.handleAddNote }
              handleDeleteNote={ this.handleDeleteNote } />
          </div>
        </div>
      </>
     );
  }
}

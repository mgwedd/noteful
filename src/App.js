import { React, Component } from 'react';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import sampleData from './sampleData';
import './App.css';

export default class App extends Component {

  state= {
    selectedNote: null, 
    selectedFolder: null, 
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
    const { data, selectedFolder, selectedNote } = this.state;
    return (
      <>
        <Header />
        <Sidebar 
          data={ data }
          selectedFolder={ selectedFolder }
          selectedNote={ selectedNote }
          handleAddFolder={ this.handleAddFolder } />
        <Main 
          data={ data }
          selectedFolder={ selectedFolder }
          selectedNote={ selectedNote }
          handleAddNote={ this.handleAddNote }
          handleDeleteNote={ this.handleDeleteNote } />
      </>
     );
  }
}

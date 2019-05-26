import React, { Component } from 'react';
import Header from './Header/Header';
import SidebarWithContext from './Sidebar/Sidebar';
import Main from './Main/Main';
import sampleData from './sampleData';
import { NotefulContext } from './NotefulContext';
import config from './config';
import './App.css';

export default class App extends Component {

  state = {
    notes: sampleData.notes,
    folders: sampleData.folders,
  }

  handleDeleteNote = ( noteId ) => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }

  handleAddNote = ( note ) => {
    this.setState({
      notes: [
        ...this.state.notes, 
        note
      ]
    });
  }

  handleAddFolder = ( folder ) => {
    this.setState({
      notes: [
        ...this.state.folders, 
        folder
      ]
    });
  }

  // componentDidMount() {
  //   Promise.all([
  //     fetch(`${config.API_ENDPOINT}/notes`),
  //     fetch(`${config.API_ENDPOINT}/folders`)
  //   ])
  //   .then(([notesRes, foldersRes]) => {
  //     if (!notesRes.ok)
  //       return notesRes.json().then(event => Promise.reject(event))
  //     if (!foldersRes.ok)
  //       return foldersRes.json().then(event => Promise.reject(event))
  //       return Promise.all([
  //         notesRes.json(),
  //         foldersRes.json(),
  //       ])
  //     })
  //     .then(([notes, folders]) => {
  //       this.setState({ notes, folders })
  //     })
  //     .catch(error => {
  //       console.error({ error })
  //     });
  // }

  render() {
    const contextValue = {
      notes: this.state.notes, 
      folders: this.state.folders,
      handleDeleteNote: this.handleDeleteNote, 
      handleAddNote: this.handleAddNote, 
      handleAddFolder: this.handleAddFolder,
    };

    return (
      <>
        <Header />
        <NotefulContext.Provider value={ contextValue }>
          <div className="sidebar_and_main_container">
            <div className="sidebar_container">
              <SidebarWithContext />
            </div>
            <div className="main_container">
              <Main />
            </div>
          </div>
        </NotefulContext.Provider>
      </>
     );
  }
}

import { React, Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import Header from './Header/Header';
import NoteList from './Notes/NoteList/NoteList';
import Note from './Notes/Note/Note'
import FolderList from './Folders/FolderList/FolderList';
import Sidebar from './Sidebar/Sidebar'
import BackButton from './BackButton/BackButton'
import Main from './Main/Main'


export default class App extends Component {
  render() {
    return (
      <>

        <Header />

        <Sidebar className="sidebar_container">
          <Route
            path='/'
            component={ FolderList }>
          </Route>
          <Route
            path='/folder/:folderId'
            component={ FolderList }> 
            {/* Folder that's selected should be highlighted in the list */}
          </Route>
          <Route
            path='/note/:noteId'
            component={ BackButton }>
          </Route>
        </Sidebar>

        <Main className="main_container">
          <Route
            path='/'
            component={ NoteList }>
          </Route>
          <Route
            path='/folder/:folderId'
            component={ NoteList }>
              {/* NoteList should display only notes that match the folderId— that are contained by it */}
          </Route>
          <Route
            path='/note/:noteId'
            component={ Note }>
              {/* NoteList should display only notes that match the folderId— that are contained by it */}
          </Route>
        </Main>

      </>
     );
  }
}

// <Header />
//         <Route
//           path="/">
//         </Route>
//         <Route
//           path="/folder:folderId"
//           component={ FolderList }>
//         </Route>
//         <Route
//           path="/note:noteId"
//           component={ NoteList }>
//         </Route>
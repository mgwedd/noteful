import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NoteList from '../Notes/NoteList/NoteList';
import Note from '../Notes/Note/Note';
import AddFolder from '../Folders/AddFolder/AddFolder';
import './Main.css';

export default function Main( props ) {
    return (
        <>
            <Switch>
                <Route
                    path='/note/:noteId'
                    component={ Note }>
                </Route>
                <Route
                    path='/folder/:folderId'
                    component={ NoteList }>
                </Route>
                <Route
                    path='/add-folder'
                    component={ AddFolder }>
                </Route>
                <Route
                    path='/'
                    component={ NoteList }>
                </Route>
            </Switch>
        </>
    );
}

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NoteList from './Notes/NoteList/NoteList';
import Note from './Notes/Note/Note';

export default function Sidebar( props ) {
    return (
        <>
            <Switch>
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
            </Switch>
        </>
    );
}

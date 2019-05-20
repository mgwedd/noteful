import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NoteList from '../Notes/NoteList/NoteList';
import Note from '../Notes/Note/Note';

export default function Main( props ) {
    return (
        <>
            <Switch>
                <Route
                    exact
                    path='/'
                    render={ ( routeProps ) => (<NoteList { ...routeProps } {...props} />) }>
                    </Route>
                <Route
                    path='/folder/:folderId'
                    render={ ( routeProps ) => (<NoteList {...routeProps} {...props}  />)  }>
                </Route>
                <Route
                    path='/note/:noteId'
                    component={ ( routeProps ) => (<Note { ...routeProps} {...props} />)  }>
                </Route>
            </Switch>
        </>
    );
}

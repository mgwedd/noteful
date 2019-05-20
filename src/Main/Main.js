import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NoteList from '../Notes/NoteList/NoteList';
import Note from '../Notes/Note/Note';

// PROBLEM WITH SINGLE NOTE ROUTE Do data fetching from data source here being given a noteId. THe problem is on the note route, 
// where no note object i sbeing passed form notelist. 

export default function Main( props ) {
    return (
        <>
            <Switch>
                <Route
                    path='/note/:noteId'
                    render={ ( routeProps ) => (<Note { ...routeProps} {...props} />)  }>
                </Route>
                <Route
                    path='/folder/:folderId'
                    children={ ( routeProps ) => (<NoteList { ...routeProps } {...props} />) }>
                </Route>
                <Route
                    path='/'
                    children={ ( routeProps ) => (<NoteList { ...routeProps } {...props} />) }>
                </Route>
            </Switch>
        </>
    );
}


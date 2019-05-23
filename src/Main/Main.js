import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NoteList from '../Notes/NoteList/NoteList';
import Note from '../Notes/Note/Note';
import './Main.css';

export default function Main( props ) {
    return (
        <>
            <Switch>
                <Route
                    path='/note/:noteId'
                    render={ ( routeProps ) => (<Note { ...routeProps} {...props} key={ routeProps.match.params.noteId } />)  }>
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


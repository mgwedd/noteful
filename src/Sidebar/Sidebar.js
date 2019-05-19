import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BackButton from './BackButton/BackButton'
import FolderList from './Folders/FolderList/FolderList';

export default function Sidebar( props ) {
    return (
        <>
            <Switch>
                <Route
                    path='/'
                    component={ FolderList }>
                </Route>
                <Route
                    path='/folder/:folderId'
                    component={ FolderList }> 
                    {/* Folder that's selected should be highlighted in the list. use helper fn*/}
                </Route>
                <Route
                    path='/note/:noteId'
                    component={ BackButton }>
                </Route>
            </Switch>
        </>
    );
}
       
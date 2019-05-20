import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FolderList from './Folders/FolderList/FolderList';

export default function Sidebar( props ) {
    return (
        <>
            <Switch>
                <Route
                    path='/'
                    render={ ( routeProps ) => <FolderList {...routeProps} { ...props }/> }>
                </Route>
                <Route
                    path='/folder/:folderId'
                    render={ ( routeProps ) => <FolderList {...routeProps} { ...props }/> }>
                </Route>
                <Route
                    path='/note/:noteId'
                    render={ () => {
                        return (
                            <>
                                <button
                                    className="back_button">
                                    Back
                                </button>
                            </>
                       );
                    }}
                >
                </Route>
            </Switch>
        </>
    );
}
       
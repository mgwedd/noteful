import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FolderList from '../Folders/FolderList/FolderList';
import Button from '../Button/Button';
import './Sidebar.css';
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
                    render={ ({ routeProps }) => {
                        return <Button 
                                    destination={ '' }
                                    className="back_button"
                                    name="Go Back"
                                    onClick={ () => routeProps.history.goBack() } />
                        }
                    }
                >
                </Route>
            </Switch>
        </>
    );
}

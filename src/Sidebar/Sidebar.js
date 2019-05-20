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
                    path='/note/'
                    render={ ({ routeProps }) => {
                        return <Button 
                                    className="back_button"
                                    name="Go Back"
                                    onClick={ () => routeProps.history.goBack() } />
                        }
                    }
                >
                </Route>
                <Route 
                    render={ ( routeProps ) => (<FolderList { ...routeProps } { ...props }  />)  }
                />
            </Switch>
        </>
    );
}

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
                        return (
                                <div className="back_button_wrapper">
                                    <Button 
                                        destination=""
                                        name="Go Back"
                                        className="back_button"
                                        { ... routeProps }/>
                                </div>);
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

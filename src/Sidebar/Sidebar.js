import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import FolderList from '../Folders/FolderList/FolderList';
import './Sidebar.css';

class Sidebar extends Component {
    
    static defaultProps = {
        history: {
          goBack: () => { }
        }
    }
    
    render() {
        return (
            <>
                <Switch>
                    <Route
                        path='/note/'
                        render={ ({ routeProps }) => {
                            return (
                                <div className="back_button_wrapper">
                                        <button 
                                        name="Back Button"
                                        className="back_button"
                                        onClick={ () => this.props.history.goBack() }>
                                        Go Back   
                                    </button>
                                </div>
                            );
                        }}
                    >
                    </Route>
                    <Route 
                        component={ FolderList }
                    />
                </Switch>
            </>
        );
    }
}
export default withRouter(Sidebar);
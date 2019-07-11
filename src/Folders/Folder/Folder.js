import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';
import { NotefulContext } from '../../NotefulContext';
const uuid = require( 'uuid/v4' )

export default class Folder extends Component {
    
    static contextType = NotefulContext

    render() {

        const { folder } = this.props

        return (
            <>
                <li key={ uuid() }>
                    <NavLink 
                        to={ `/folder/${ folder.id }`}
                        key={ uuid() }
                        className="folder"
                        activeClassName="selected">
                        { folder.name }
                    </NavLink>
                </li>
            </>
        )
    }
}

// only one way to instantiate a folder, so it's required.
Folder.propTypes = {
    folder: propTypes.object.isRequired
}
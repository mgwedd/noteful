import React from 'react';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';
const uuid = require( 'uuid/v4' )

export default function Folder( props ) {
    const { folder } = props;
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
    );
}

// only one way to instantiate a folder, so it's required.
Folder.propTypes = {
    folder: propTypes.object.isRequired
}
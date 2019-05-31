import React from 'react';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';

export default function Folder( props ) {
    const { folder } = props;
    return (
        <>
            <li key={ folder.id }>
                <NavLink 
                    to={ `/folder/${ folder.id }`}
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
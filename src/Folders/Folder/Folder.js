import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Folder( props ) {
    const { folder } = props;
    return (
        <>
            <NavLink 
                to={ `/folder/${ folder.id }`}
                className="folder"
                activeClassName="selected">
                { folder.name }
            </NavLink>
        </>
    );
}

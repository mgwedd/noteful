import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Folder( props ) {
    const { folder } = props;
    return (
        <>
            <NavLink 
                to={ `Folder/:${folder.id}` }
                className="folder_navlink-component">
                <h2 className="folder_name">{ folder.name }</h2>
            </NavLink>
        </>
    );
}

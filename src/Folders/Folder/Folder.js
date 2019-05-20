import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Folder( props ) {
    const { folder } = props;
    return (
        <>
            <div className="folder">
                <NavLink 
                    to={ `/folder/${ folder.id }` }>
                    <h2 className="folder_name">{ folder.name }</h2>
                </NavLink>
            </div>
        </>
    );
}

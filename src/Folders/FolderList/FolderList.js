import React, { Component } from 'react';
import Folder from '../Folder/Folder';
import { NavLink } from 'react-router-dom';
import { NotefulContext } from '../../NotefulContext';

export default class FolderList extends Component {

    static contextType = NotefulContext;

    render () {
        const { folders=['noFoldersFromContext'] } = this.context;
        const folderList = folders.map(( folder, index ) => {
            return <Folder 
                        folder={ folder }
                        key={ index } />
        });
        return (
            <>
                <ul className="folder_list">
                    { folderList }
                </ul>
                    <NavLink 
                        to="/add-folder"
                        className="add_folder_button"
                        activeClassName="selected">
                        Add Folder   
                    </NavLink>
            </>
        );
    }
}

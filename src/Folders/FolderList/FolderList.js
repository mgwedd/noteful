import React, { Component } from 'react';
import Folder from '../Folder/Folder';
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
            </>
        );
    }

}


import React from 'react';
import Folder from '../Folder/Folder';

export default function FolderList( props ) {
    const { data } = props;
    const folders = data.folders.map(( folder ) => {
        return <Folder 
                    folder={ folder } 
                    key={ folder.id }
                    { ...props }
                />
    });

    return (
        <>
            <ul>
                { folders }
            </ul>
        </>
    );
}

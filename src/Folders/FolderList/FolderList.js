import React, { Component } from 'react'
import Folder from '../Folder/Folder'
import { NavLink } from 'react-router-dom'
import { NotefulContext } from '../../NotefulContext'
const uuid = require( 'uuid/v4' )

export default class FolderList extends Component {

    static contextType = NotefulContext

    render () {
        const { folders=['noFoldersFromContext'] } = this.context

        const folderList = folders.map(( folder ) => {
            return <Folder 
                folder={ folder }
                key={ uuid() } />
        })

        return (
            <>
                <ul className="folder_list">
                    { folderList }
                </ul>
                <NavLink 
                    to="/add-folder"
                    onUpdate={() => window.scrollTo(0, 0)}
                    className="add_folder_button"
                    activeClassName="selected">
                    Add Folder   
                </NavLink>
            </>
        )
    }
}

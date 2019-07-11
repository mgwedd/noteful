import React, { Component } from 'react'
import { Switch, Route} from 'react-router-dom'

import AllNotes from '../AllNotes/AllNotes'
import NotesForFolder from '../NotesForFolder/NotesForFolder'

import { NotefulContext } from '../../NotefulContext'

export default class NoteList extends Component {
    
    static contextType = NotefulContext
    
    render() {

        const { notes, folders } = this.context
        
        return (
            <>
                <Switch>
                    <Route
                        path={ '/folder/:folderId' }
                        render={ ( props ) => <NotesForFolder 
                            notes={notes} 
                            folders={folders}
                            {... props} /> 
                        }>
                    </Route>
                    <Route
                        path={ '/'}
                        render={ ( props ) => <AllNotes 
                            notes={notes} 
                            {... props} /> 
                        }>
                    </Route>
                </Switch>
            </>
        )
    }
}

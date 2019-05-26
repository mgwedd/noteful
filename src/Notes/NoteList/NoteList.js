import React, { Component } from 'react';
import Note from '../Note/Note';
import { NotefulContext } from '../../NotefulContext';
import { getNotesForFolder } from '../../helper-functions';

export default class NoteList extends Component {
    
    // In case there's no folder selected, to avoid undef error when destructuring it for the note pull.
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = NotefulContext;

    render() {
        const { folderId } = this.props.match.params; 
        // PROBLEM: the routeProps aren't being passed down in context obviously, that's why they're undefined here. 
        // You might need to manually pass down routeprops? Or a new provider? that'd be complex. https://medium.freecodecamp.org/how-to-protect-your-routes-with-react-context-717670c4713a
        const { notes=['noNotes from context in NoteList'] } = this.context;
        console.log('notes obj from context in Notelist --> ', notes);
        const notesForFolder = getNotesForFolder( notes, folderId );
        console.log('return of getNotesForFolder() in Notelist --> ', notesForFolder);
        const notesList = notesForFolder.map( ( note, index ) => {
            return <Note 
                        note={ note }
                        key={ index } />
        });
        console.log('notesList, the rendered Note objects, in Notelist, before return --> ', notesList);
        return (
            <>
                <ul>
                    { notesList }
                </ul>
            </>
        );
    }
}

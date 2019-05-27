import React, { Component } from 'react';
import Note from '../Note/Note';
import { NotefulContext } from '../../NotefulContext';
import { getNotesForFolder } from '../../helper-functions';

export default class NoteList extends Component {
    
    static defaultProps = {
        match: {
            params: {}
        }
    }
    
    static contextType = NotefulContext;

    render() {
        const { folderId } = this.props.match.params; 
        const { notes=['noNotes from context in NoteList'] } = this.context;
        const notesForFolder = getNotesForFolder( notes, folderId );
        const notesList = notesForFolder.map( ( note ) => {
            return <Note 
                        note={ note }
                        key={ note.id }
                        noteId={ note.id } />
        });
        return (
            <>
                <ul>
                    { notesList }
                </ul>
            </>
        );
    }
}

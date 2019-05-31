import React, { Component } from 'react';
import { NotefulContext } from '../../NotefulContext';
import config from '../../config';

export default class AddNote extends Component { 

    state = {
        name: '', 
        content: '', 
        folderId: ''
    }
        
    static defaultProps = {
        history: {
          push: () => { }
        },
    }   

    static contextType = NotefulContext;

    updateNoteName = ( name ) => {
        this.setState({ name })
    }

    updateNoteContent = ( content ) => {
        this.setState({ content })
    }

    updateNoteFolder = ( folderId ) => {
        this.setState({ folderId })
    }

    handleFormSubmission = ( submitEvent ) => {
        submitEvent.preventDefault();
        const { addNote } = this.context;
        const { history } = this.props;
        const note = { ...this.state, modified: new Date() }; 
        
        fetch(`${ config.API_ENDPOINT }/notes`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify( note ),
          })
        .then(response => {
            if (!response.ok)
            return response.json().then(badNoteResponse => Promise.reject( badNoteResponse ));
            return response.json();
        })
        .then(note => {
            addNote( note );
            history.push(`/note/${ note.id }`);
        })
        .catch(error => {
            console.error({ error })
        })
    }

    render() {
        return (
            <>
                <div className="form_wrapper_note">
                    <form 
                        className="add_form"
                        onSubmit={submitEvent => this.handleFormSubmission( submitEvent )}>
                        <legend><h2 className="form_legend">Add Note</h2></legend>
                        <div className="input_group_wrapper">
                            <label htmlFor="noteName" className="input_label">Note Title:</label>
                            <input 
                                type="text" 
                                name="noteName" 
                                className="name_input_note"
                                placeholder="Tuesday Thoughts"
                                onChange={ keyInput => this.updateNoteName( keyInput.target.value ) }>
                            </input>
                        </div>
                        <div className="input_group_wrapper ">
                            <label htmlFor="noteContent" className="input_label">Your Note:</label>
                            <textarea 
                                rows="5" 
                                cols="40" 
                                name="noteContent"
                                className="content_input"
                                placeholder="Something worth remembering..."
                                onChange={ keyInput => this.updateNoteContent( keyInput.target.value ) }>
                            </textarea>
                        </div>
                        <div className="input_group_select_wrapper">
                            <label htmlFor="noteFolder" className="folder_input_label">Folder:</label>
                            <select 
                                name="noteFolder" 
                                className="folder_input"
                                onChange={ selectEvent => this.updateNoteFolder( selectEvent.target.value ) }>
                                <option defaultValue="" disabled selected>Choose Folder</option>
                                { this.context.folders.map(( folder, index ) => <option value={ folder.id } key={ index }>{ folder.name }</option> ) }
                            </select>
                        </div>
                        <div className="form_button_wrapper">
                            <button type="submit" className="form_button" disabled={ this.state.folderName === '' }>
                                Add Note
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

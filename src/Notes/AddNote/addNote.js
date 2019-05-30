import React, { Component } from 'react';
import { NotefulContext } from '../../NotefulContext';
import config from '../../config';

// Create a new component AddNote that implements a form to capture 
//the name, 
//content 
// folder for a new Note. 
//Submit to the POST /notes endpoint on the server. 
//Add validation to ensure that the name of the note is not left blank. 
//The folder should be selected from a list of existing folders. 
//Ensure that errors are properly handled. Add a button to the note list page to invoke this new form.

export default class AddNote extends Component { 

    state = {
        noteName: '', 
        noteContent: '', 
        noteFolder: null
    }
        
    static defaultProps = {
        history: {
          push: () => { }
        },
    }   

    static contextType = NotefulContext;

    updateNoteName = ( keyInput ) => {
        this.setState({noteName: keyInput})
    }

    updateNoteContent = ( keyInput ) => {
        this.setState({noteContent: keyInput})
    }

    handleFormSubmission = ( submitEvent ) => {
        submitEvent.preventDefault();
        // const note = {
        //     noteTitle: submitEvent.target['noteTitle'].value, 
        //     noteContent: submitEvent.target['noteContent'].value, 
        //     noteFolder: submitEvent.target['noteFolder'].value
        // }     
        // console.log('submission received:  ', note);
        // const { history } = this.props;
        // fetch(`${config.API_ENDPOINT}/folders`, {
        //     method: 'POST',
        //     headers: {
        //       'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(note),
        //   })
        // .then(response => {
        //     if (!response.ok)
        //     return response.json().then(badFolderResponse => Promise.reject(badFolderResponse));
        //     return response.json();
        // })
        // .then(folder => {
        //     this.context.addFolder(folder);
        //     history.push(`/folder/${folder.id}`);
        // })
        // .catch(error => {
        //     console.error({ error })
        // })
    }

    render() {
        return (
            <>
                {/* <div className="form_wrapper note"> */}
                <div className="custom-select">
                    <form 
                        className="add_form"
                        onSubmit={submitEvent => this.handleFormSubmission( submitEvent )}>
                        <legend><h2 className="form_legend">Add Note</h2></legend>
                        <div className="input_group_wrapper">
                            <label htmlFor="noteName" className="input_label">Name Your Note:</label>
                            <input 
                                type="text" 
                                name="noteName" 
                                className="name_input"
                                placeholder="Tuesday Thoughts"
                                onChange={ keyInput => this.updateNoteName( keyInput.target.value ) }>
                            </input>
                        </div>
                        <div className="input_group_wrapper">
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
                        <div className="input_group_wrapper">
                            <label htmlFor="folder" className="input_label">Folder:</label>
                            <select name="folders" className="folder_input">
                                { this.context.folders.map(( folder ) => <option value={ folder.id }>{ folder.name }</option> ) }
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

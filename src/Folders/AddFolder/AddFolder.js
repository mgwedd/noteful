import React, { Component } from 'react';
import { NotefulContext } from '../../NotefulContext';
import config from '../../config';

// Create a new component AddFolder that implements a form to capture the name of a new folder 
// from the user. This form should submit the name of the new folder to the POST /folders endpoint 
// on the server. Ensure that any errors are properly handled. 
// Add a button to the navigation to invoke the new form.

export default class AddFolder extends Component { 

    state = {
        folderName: ''
    }

        
    static defaultProps = {
        history: {
          push: () => { }
        },
    }   

    static contextType = NotefulContext;

    updateFolderName = ( keyInput ) => {
        this.setState({folderName: keyInput})
    }

    handleFormSubmission = ( submitEvent ) => {
        submitEvent.preventDefault();
        const folder = {
            name: submitEvent.target['folderName'].value
        }     
        console.log('submission received:  ', folder);
        const { history } = this.props;
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(folder),
          })
            .then(response => {
              if (!response.ok)
                return response.json().then(error => Promise.reject(error))
              return response.json()
            })
            .then(folder => {
              this.context.addFolder(folder);
              history.push(`/folder/${folder.id}`);
            })
            .catch(error => {
              console.error({ error })
            })
    }

    // post submitted name to the server.
    // make sure the folderlist renders again with the new folder added.
    render() {
        return (
            <>
                <div className="form_wrapper">
                    <form 
                        className="add_folder_form"
                        onSubmit={submitEvent => this.handleFormSubmission( submitEvent )}>
                        <legend><h2 className="form_legend">Add Folder</h2></legend>
                        <div className="input_group_wrapper">
                            <label htmlFor="folderName" className="input_label">Folder Name:</label>
                            <input 
                                type="text" 
                                name="folderName" 
                                className="folder_name_input"
                                placeholder="Dreams"
                                onChange={ keyInput => this.updateFolderName( keyInput.target.value ) }>
                            </input>
                        </div>
                        <div className="form_button_wrapper">
                            <button type="submit" className="form_button" disabled={ this.state.folderName === '' }>
                                Add Folder
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

import React, { Component } from 'react';
import { NotefulContext } from '../../NotefulContext';
import config from '../../config';

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
            return response.json().then(badFolderResponse => Promise.reject(badFolderResponse));
            return response.json();
        })
        .then(folder => {
            this.context.addFolder(folder);
            history.push(`/folder/${folder.id}`);
        })
        .catch(error => {
            console.error({ error })
        })
    }

    render() {
        return (
            <>
                <div className="form_wrapper_folder">
                    <form 
                        className="add_form"
                        onSubmit={submitEvent => this.handleFormSubmission( submitEvent )}>
                        <legend><h2 className="form_legend">Add Folder</h2></legend>
                        <div className="input_group_wrapper">
                            <label htmlFor="folderName" className="input_label">Folder Name:</label>
                            <input 
                                type="text" 
                                name="folderName" 
                                className="name_input"
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

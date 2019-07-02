import React, { Component } from 'react';
import { NotefulContext } from '../../NotefulContext';

export default class AddFolder extends Component { 

    state = {
        folderName: ''
    }
        
    static defaultProps = {
        history: {
          push: () => {}
        },
    }   

    static contextType = NotefulContext;

    updateFolderName = keyInput => this.setState( {folderName : keyInput} )

    handleFormSubmission = ( submitEvent ) => {
        submitEvent.preventDefault();
        
        const folderToAdd = {
            name : submitEvent.target['folderName'].value
        }    

        this.handleAddFolderInterface( folderToAdd )

    }

    handleAddFolderInterface = async ( folderToAdd ) => {
        const { addFolder, createApiInterface } = this.context
        const { history } = this.props
        
        this.addFolderInterface = createApiInterface({
            method : 'POST', 
            endpoint : 'folder', 
            body : folderToAdd
        }) 

        const addedFolder = await this.addFolderInterface.goFetch()

        // add the folder to the main app's state
        addFolder( addedFolder )

        // navigate to the newly added folder
        history.push(`/folder/${ addedFolder.id }`)
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
                                className="name_input_folder"
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
        )
    }
}

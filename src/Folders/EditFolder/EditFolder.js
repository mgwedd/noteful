import React, { Component } from 'react'
import { NotefulContext } from '../../NotefulContext';

export default class EditFolder extends Component {

    
    static defaultProps = {
        history: {
            push: () => {}
        },
    }   
    
    static contextType = NotefulContext
    
    state = {
        folderName : '', 
        currentFolder : {}, 
    }

    componentDidMount() {
        const { currentFolder } = this.props.location.state
        this.setState( { currentFolder } )
    }

    updateFolderName = keyInput => this.setState( {folderName : keyInput} )

    handleFormSubmission = ( submitEvent ) => {
        submitEvent.preventDefault()
        
        const folderToUpdate = {
            name : submitEvent.target['folderName'].value
        }    

        this.handleUpdateFolderInterface( folderToUpdate )
    }

    handleUpdateFolderInterface = async ( folderToUpdate ) => {
        const { updateFolder, createApiInterface } = this.context
        const { currentFolder } = this.state
        const { history } = this.props
        
        this.updateFolderInterface = createApiInterface({
            method : 'PATCH', 
            endpoint : 'folder', 
            resourceId : currentFolder.id,
            body : folderToUpdate
        }) 

        const updatedFolder = await this.updateFolderInterface.goFetch()
        // add the updated folder to the main app's state
        updateFolder( updatedFolder )

        // navigate to the newly updated folder
        history.push(`/folder/${updatedFolder.id}`)
    }

    render() {
        const { currentFolder } = this.state

        return (
            <>
                <div className="form_wrapper_folder">
                    <form 
                        className="add_form"
                        onSubmit={submitEvent => this.handleFormSubmission( submitEvent )}>
                        <legend><h2 className="form_legend">Edit Folder</h2></legend>
                        <div className="input_group_wrapper">
                            <label htmlFor="folderName" className="input_label">Folder Name:</label>
                            <input 
                                type="text" 
                                name="folderName" 
                                className="name_input_folder"
                                defaultValue={currentFolder && currentFolder.name}
                                onChange={ keyInput => this.updateFolderName( keyInput.target.value ) }>
                            </input>
                        </div>
                        <div className="form_button_wrapper">
                            <button type="submit" className="form_button" disabled={ this.state.folderName === '' }>
                                Update Folder
                            </button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}
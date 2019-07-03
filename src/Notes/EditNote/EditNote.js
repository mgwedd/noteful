import React, { Component } from 'react'
import { NotefulContext } from '../../NotefulContext';

export default class EditNote extends Component {

    state = {
        id : '',
        name : '',
        content : '', 
        folderid : '' 
    }
        
    static defaultProps = {
        history: {
          push: () => {}
        },
    }   

    static contextType = NotefulContext

    componentDidMount() {
        const { noteToRender : currentNote } = this.props.location.state
        this.setState( { ...currentNote } )
    }

    updateNoteName = keyInput => this.setState( { ...this.state.currentNote, name : keyInput} )
    updateNoteContent = keyInput => this.setState( { ...this.state.currentNote, content : keyInput} )
    updateNoteFolder = keyInput => this.setState( { ...this.state.currentNote, folderid : keyInput} )

    handleFormSubmission = ( submitEvent ) => {
        submitEvent.preventDefault()
        const { name, content, folderid } = this.state
        const noteToUpdate = { 
            name, 
            content, 
            folderid
        }    

        this.handleUpdateNoteInterface( noteToUpdate )
    }

    handleUpdateNoteInterface = async ( noteToUpdate ) => {
        const { createApiInterface, updateNote } = this.context
        const { id : noteId } = this.state
        const { history } = this.props
        
        this.updateNoteInterface = createApiInterface({
            method : 'PATCH', 
            endpoint : 'note', 
            resourceId : noteId,
            body : noteToUpdate
        }) 

        const updatedNote = await this.updateNoteInterface.goFetch()
        // add the updated note to the main app's state
        updateNote( updatedNote )

        // navigate to the newly updated note
        history.push(`/note/${updatedNote.id}`)
    }

    getCurrentFolder = ( folderId ) => {
        return this.context.folders.find( folder => folder.id === parseInt( folderId ) ) || 'Unknown'
    }
    
    render() {
        const { name, content, folderid } = this.state
        return (
            <>
              <div className="form_wrapper_note">
                    <form 
                        className="add_form"
                        onSubmit={submitEvent => this.handleFormSubmission( submitEvent )}>
                        <legend><h2 className="form_legend">Edit Note</h2></legend>
                        <div className="input_group_wrapper">
                            <label htmlFor="noteName" className="input_label">Name:</label>
                            <input 
                                type="text" 
                                name="noteName" 
                                className="name_input_note"
                                defaultValue={ name }
                                onChange={ keyInput => this.updateNoteName( keyInput.target.value ) }>
                            </input>
                        </div>
                        <div className="input_group_wrapper ">
                            <label htmlFor="noteContent" className="input_label">Content:</label>
                            <textarea 
                                rows="5" 
                                cols="40" 
                                name="noteContent"
                                className="content_input"
                                value={ content }
                                onChange={ keyInput => this.updateNoteContent( keyInput.target.value ) }>
                            </textarea>
                        </div>
                        <div className="input_group_select_wrapper">
                            <label htmlFor="noteFolder" className="folder_input_label">Folder:</label>
                            <select 
                                name="noteFolder" 
                                className="folder_input"
                                onChange={ selectEvent => this.updateNoteFolder( selectEvent.target.value ) }>
                                <option disabled selected>{this.getCurrentFolder( folderid ).name}</option>
                                { this.context.folders.map(( folder, index ) => <option value={ folder.id } key={ index }>{ folder.name }</option> ) }
                            </select>
                        </div>
                        <div className="form_button_wrapper">
                            <button type="submit" className="form_button" disabled={ this.state.name === '' }>
                                Update Note
                            </button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}
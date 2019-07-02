import React, { Component } from 'react';
import { NotefulContext } from '../../NotefulContext';

export default class AddNote extends Component { 

    state = {
        name : '', 
        content : '', 
        folderid : ''
    }
        
    static defaultProps = {
        history: {
          push: () => {}
        },
    }   

    static contextType = NotefulContext;

    updateNoteName = ( name ) => {
        this.setState({ name })
    }

    updateNoteContent = ( content ) => {
        this.setState({ content })
    }

    updateNoteFolder = ( folderid ) => {
        this.setState({ folderid })
    } 

    addNoteInterfaceHandler = async ( noteToAdd ) => {
        const { addNote, createApiInterface } = this.context
        const { history } = this.props
        console.log('about to post new note >> ', noteToAdd)
        this.addNoteInterface = createApiInterface({
            method : 'POST', 
            endpoint : 'note', 
            body : noteToAdd
        }) 

        const addedNote = await this.addNoteInterface.goFetch()

        // add the note to the main app's state
        addNote( addedNote )

        // navigate to the newly added note
        history.push(`/note/${ addedNote.id }`)
    }

    handleFormSubmission = ( submitEvent ) => {
        submitEvent.preventDefault()
        const noteToAdd = { ...this.state } // note's modified_date will be timestamped on the server
        this.addNoteInterfaceHandler( noteToAdd )
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

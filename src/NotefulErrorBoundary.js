import React, { Component } from 'react';

export default class NotefulErrorBoundary extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            hasError: false, 
            error: ''
        }
    }

    static getDerivedStateFromError( error ) {
        this.setState({ error });
        return { hasError: true };
    }

    render () {
        const { hasError, error } = this.state;
        const { children } = this.props;
        if ( hasError ) {
            console.log('An error has occured: ', error.message );
            return (
                <h2>Something went wrong! Sorry, but Noteful is currently unavailable.</h2>
            );
        } else {
            return children;
        }
    }
}

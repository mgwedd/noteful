import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkButton( props ) {
    const { destination, name, buttonHandler } = props;
    return (
        <>
            <Link 
                to={ destination }
                className={ `link-button_${ name }` }
                onClick={event => buttonHandler(event) }>
            { name }
            </Link>
        </>
    );
}
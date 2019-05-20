import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export default function LinkButton( props ) {
    const { destination, name, buttonHandler } = props;
    return (
        <>
            <Link 
                to={ destination }
                className="button"
                onClick={ event => buttonHandler(event) }>
            { name }
            </Link>
        </>
    );
}

import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export default function LinkButton( props ) {
    const { destination, name, className, history, buttonHandler } = props;

    let handleClick;
    if ( className === 'back_button' ) {
        handleClick = () => history.goBack();
    } else {
        handleClick = buttonHandler;
    }
    return (
        <>
            <Link 
                to={ destination }
                className={ className }
                onClick={ event => handleClick( event ) }  >
            { name }
            </Link>
        </>
    );
}

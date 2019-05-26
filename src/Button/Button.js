import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NotefulContext } from '../NotefulContext';
import './Button.css';

export default class LinkButton extends Component {
    
    static contextType = NotefulContext;

    render () {
        const { destination, name, className, history } = this.props;
        const { buttonHandler } = this.context;
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
    
}

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header( props ) {
    return (
        <>
            <header className="header_container">
                <Link 
                    to="/"
                    className="header_linked_title">
                    Noteful
                </Link>
            </header>
        </>
    );
}

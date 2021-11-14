import React from 'react';

const Navbar = () => {
    return (
        <nav className = 'navbar bg-dark'>
            <h1>
                <a href='index.html'>
                    <i className = 'fas fa-code' /> NetworkING
                </a>
            </h1>
        <ul>
            <li>
                <a href='profiles.html'>Professionals</a>
            </li>
            <li>
                <a href='register.html'>Sign Up</a>
            </li>
            <li>
                <a href='login.html'>Log In</a>
            </li>
        </ul>
        </nav>
    );
}
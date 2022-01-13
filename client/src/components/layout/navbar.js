import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: {isAuthenticated, loading}, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <Link to='/dashboard'><i className="fas fa-user"/>{''}<span className="hide-sm"/>Dashboard</Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <i className = "fas fa-sign-out-alt">{' '}</i>
                    <span className="hide-sm"></span>Log Out</a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Professionals</Link>
            </li>
            <li>
                <Link to='/register'>Sign Up</Link>
            </li>
            <li>
                <Link to='/login'>Log In</Link>
            </li>
        </ul>
    )

    return (
        <nav className = 'navbar bg-dark'>
            <h1>
                <Link to='/'>
                    <i className = 'fas fa-code' /> NetworkING
                </Link>
            </h1>
        { !loading && (<Fragment>{ isAuthenticated ? authLinks: guestLinks }</Fragment>)}
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default Navbar;
export default connect(mapStateToProps, { logout })(Navbar);
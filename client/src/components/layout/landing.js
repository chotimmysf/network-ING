import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard'/>;
    }

    return (
        <section class="landing">
            <div class="dark-overlay">
                <div class="landing-inner">
                    <h1 class="x-large">Network with Powerful Professionals.</h1>
                    <p class="lead">
                        Create a professional profile and share accomplishments and industry news to your fellow professionals!
                    </p>
                    <div class="buttons">
                        <Link to='/register' class="btn btn-primary">Sign Up</Link>
                        <Link to='/login' class="btn btn-light">Log In</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
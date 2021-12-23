import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
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

export default Landing;
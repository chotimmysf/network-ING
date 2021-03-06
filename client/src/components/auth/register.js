import React, {Fragment, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { setAlert } from '../../actions/alerts';
import { register } from '../../actions/auth';
import { PromiseProvider } from 'mongoose';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const { name, email, password, passwordConfirm } = formData;

    const onChange = e => setFormData({...formData, name: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        // Check if passwords match //
        if(password != passwordConfirm) {
            setAlert('Passwords do not match.', 'danger', 6000)
        } else {
            register({ name, email, password });
        }
    };

    if(isAuthenticated) {
      return <Redirect to='/dashboard' />
    }

    return <Fragment>
       <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" action="create-profile.html">
        <div className="form-group">
          <input 
          type="text" 
          placeholder="Name" 
          name="name" 
          value={name}
          onChange={e => onChange(e)} 
          required />
        </div>
        <div className="form-group">
          <input 
          type="email" 
          placeholder="Email Address" 
          name="email"
          value={email}
          onChange={e => onChange(e)} 
          required />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="10"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={e => onChange(e)}
            minLength="10"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p> 
    </Fragment>;
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect( mapStateToProps, { setAlert, register })(Register);
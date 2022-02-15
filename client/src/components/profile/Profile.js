import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'mongoose';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getProfileById } from '../../actions/profile';
import ProfileAbout from './ProfileAbout';

const Profile = ( { getProfileById, profile: { profile, loading}, auth, match}) => {
  useEffect(() => {
      getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  
    return (
        <Fragment>
            { profile === null || loading ? <Spinner /> : <Fragment>Profile</Fragment>}
            <Link to='/profiles' className='btn btn-light'>Back to Profiles</Link>
            {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user_id && 
            (<Link to='/edit-profile' className="btn btn-dark">Edit Profile</Link>)}
            <div class="profile-grid my-1">
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
            </div>
        </Fragment>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile);

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProfileItem from './ProfileItem';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: {profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

  return <Fragment>
      { loading ? <Spinner/> : <Fragment>
          <h1 className="large text-primary">Professionals</h1>
          <p className="lead">
              <i className="fab fa-connectdevelop">Browse and connect with professionals</i>
          </p>
          <div className="profiles">
              {profiles.length > 0 ? (
                  profiles.map(profile => (
                      <ProfileItem key={profile._id} profile={profile} />
                  ))
              ) : <h2>No profiles found...</h2>}
          </div>
          </Fragment>}
  </Fragment>;
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);

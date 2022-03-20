import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react';
import { deleteComment } from '../../actions/post';
import auth from '../../reducers/auth';

const CommentItem = ({postId, comment: { _id, text, name, avatar, user, date}}) => (
    <div class='post bg-white p-1 my-1'>
        <div>
            <Link to={`profile/${user}`}>
                <img class="round-img" src={avatar} alt='' />
            </Link>
            <h2>{name}</h2>
        </div>
        <div>
            <p class='my-1'> {text} </p>
            <p class='post-date'>Posted on <Moment format='YYYY/MM/DD'/>{date}</p>
            {!auth.loading && user === auth.user._id && (
                <button onClick={e => deleteComment(postId, _id)} type='button' className='btn btn-danger'>
                    <i className='fas fa-times' />
                </button>
            )}
        </div>
    </div>
);

CommentItem.prototype = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

CommentItem.propTypes = ({
    auth: state.auth
});

export default connect(mapStateToProps, { })(CommentItem);
import React, { Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import PostForm from '../posts/PostForm';
import Comment from '../post/CommentForm';
import PostItem from '../posts/PostItem';

const Post = ({ getPost, post: {post, loading}, match}) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);

    return loading || post === null ? <Spinner /> : <Fragment>
        <Link to='/posts' className='btn'>Back to Posts</Link>
        <PostItem post={post} showActions={false}/>
        <CommentForm postId={post._Id} />
        <div className="comments">
            {post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
        </div>
    </Fragment>
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
    const [text, setText] = useState('');

    return (
        <div class="post-form">
            <div class="bg-primary p">
                <h3>Comment...</h3>
            </div>
            <form class="form my-1"
            onSubmit={e => {
                e.preventDefault();
                addComment(postId, { text });
                setText('');
            }}>
                <textarea name="text" cols="30" rows="6" 
                placeholder="Write something inspirational..." value={text}
                onChange={e => setText(e.target.value)} required></textarea>
            </form>
        </div>
      )
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
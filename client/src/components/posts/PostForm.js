import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../.../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <div class="post-form">
        <div class="bg-primary p">
            <h3>Say something...</h3>
        </div>
        <form class="form my-1"
        onSubmit={e => {
            e.preventDefault();
            addPost({ text });
            setText('');
        }}>
            <textarea name="text" cols="30" rows="6" 
            placeholder="Write something inspirational..." value={text}
            onChange={e => setText(e.target.value)} required></textarea>
        </form>
    </div>
  )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostForm)
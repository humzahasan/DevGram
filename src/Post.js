import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Post.css';
const Post = () => {
  return (
    <div className='post'>
      <div className='post_header'>
        <Avatar alt='Humza' src='/broken-image.jpg' className='post_avatar' />
        <h3>Username</h3>
      </div>
      <img
        className='post_image'
        alt='image'
        src='https://www.medianic.co.uk/wp-content/uploads/2018/08/ReactLogo-2-300x208.jpg'
      />
      
        <h4 className='post_text'><strong>Username </strong> Caption</h4>
    
    </div>
  );
};

export default Post;

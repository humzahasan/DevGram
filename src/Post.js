import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Post.css';
const Post = ({username, imageUrl, caption}) => {
  return (
    <div className='post'>
      <div className='post_header'>
        <Avatar
          alt={username}
          src='/broken-image.jpg'
          className='post_avatar'
        />
        <h3>{username}</h3>
      </div>
      <img className='post_image' alt={`im$`} src={imageUrl} />

      <h4 className='post_text'>
        <strong>{username}</strong> {caption}
      </h4>
    </div>
  );
};

export default Post;

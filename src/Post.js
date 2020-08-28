import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Post.css';
import {db} from './firebase';
import firebase from 'firebase';

const Post = ({username, imageUrl, caption, postId, user}) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment('');
  };

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

      <div className='posts_comments'>
        {comments.map((comment) => (
          <p>
            <b>{comment.username}</b> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className='post_commentBox'>
          <input
            className='post_input'
            type='text'
            placeholder='Add comments...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className='post_button'
            disabled={!comment}
            type='submit'
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;

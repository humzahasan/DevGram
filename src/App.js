import React, {useState, useEffect} from 'react';
import Post from './Post';
import ImageUpload from './ImageUpload';
import './App.css';
import {db, auth} from './firebase';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Input} from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({id: doc.id, post: doc.data()})));
    });
  }, []);

  const SignUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  const SignIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };
  console.log(posts);
  return (
    <div className='app'>
      {/*Sign Up Modal*/}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app_signup'>
            <center>
              <h2>DevGram</h2>
            </center>
            <Input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type='text'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={SignUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      {/* Sign In Modal */}
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app_signin'>
            <center>
              <h2>DevGram</h2>
            </center>
            <Input
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type='text'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={SignIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

      <div className='app_header'>
        <h2>DevGram</h2>
        {user ? (
          <Button onClick={() => auth.signOut()}>LogOut</Button>
        ) : (
          <div className='app_credential'>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      <div className='app_post'>
        <center>
        {posts.map(({id, post}) => (
          <Post
            key={id}
            username={post.username}
            imageUrl={post.imageUrl}
            caption={post.caption}
          />
        ))}
        </center>
      </div>
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Please Login to upload file</h3>
      )}
    </div>
  );
}

export default App;

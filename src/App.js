import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import { auth, db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

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
  const [modalStyle] = React.useState(getModalStyle);
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
        //user has logged in
        console.log(authUser);
          setUser(authUser);

          // if (authUser.displayName) {
          //   //dont update username
          // } else {
          //   //if we just created someone
          //   return authUser.updateProfile({
          //     displayName: username,
          //   });
          // }
      } else {
        // yser has logged out
        setUser(null);
      }
    })

    return () => {
      //perform cleanup
      unsubscribe();
    }
  }, [user, username]);


  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      //the code fires every time a new post is added
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

const signUp = (event) => {
  event.preventDefault();
  auth.createUserWithEmailAndPassword(email, password)
  .then((authUser) => {
   return authUser.user.updateProfile({
      displayName: username
    })
  })
  .catch((error) => alert(error.message))
}

const signIn = (event) => {
  event.preventDefault();

  auth
  .signInWithEmailAndPassword(email, password)
  .catch((error) => alert(error.message))

  setOpenSignIn(false)

}
  return (
    <div className="app">
        <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <center>
          <img 
                  className="app__headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt=""
          />
        </center>
        <form >
          <center className="app__signup">

              <Input 
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input 
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn}>Sign In</Button>
            </center>
        </form>
            
        </div>
      </Modal>    
    <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <center>
          <img 
                  className="app__headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt=""
          />
        </center>
        <form >
          <center className="app__signup">
              <Input 
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input 
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input 
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>Sign Up</Button>
            </center>
        </form>
            
        </div>
      </Modal>      

     <div className="app__header">
       <img 
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
          {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
          ) : (
          <div className="app__loginContainer">
              <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
              <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
     )}
     </div>

    <div className="app__posts">
          {
            posts.map(({id, post}) => (
              <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))
          } 
    </div>

      {user?.displayName ? (
      <ImageUpload username={user.displayName} />
    ): (
      <h3 className="app__loginToUpload">Please login to upload</h3>
    )}

    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import Post from './Post';

function App() {
  const [posts, setPosts] = useState([
    {
      username: "uchiha01",
      caption: "time flies",
      imageUrl: "https://avatars.mds.yandex.net/get-zen_doc/1908497/pub_5cbcac5a6c165100b0a5252f_5cbdfdcdaa025b00b47b78dc/scale_1200" },

      {
        username: "naruto_uzumaki",
        caption: "helloooo there!",
        imageUrl: "https://bipbap.ru/wp-content/uploads/2017/10/Naruto-Uzumaki-narutoxpert-37509313-1024-663-640x414.jpg" }
  ]);

  return (
    <div className="app">      
     <div className="app__header">
       <img 
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
     </div>

      <h1>this is an Instagram clone with React, lets gooo!</h1>

      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
      
    </div>
  );
}

export default App;

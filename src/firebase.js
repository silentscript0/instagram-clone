  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB3eOFezXrjeo2ixqjYkU6a2zCmWNY2GQo",
    authDomain: "instagram-clone-6405d.firebaseapp.com",
    projectId: "instagram-clone-6405d",
    storageBucket: "instagram-clone-6405d.appspot.com",
    messagingSenderId: "869226006706",
    appId: "1:869226006706:web:8b06a6c2d75687b70721ab",
    measurementId: "G-7366HH7QNJ"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage };
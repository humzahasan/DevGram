import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyD0Bbbh53kQPgZEqau25O1ViVuN_RTl4_M',
  authDomain: 'devgrampro.firebaseapp.com',
  databaseURL: 'https://devgrampro.firebaseio.com',
  projectId: 'devgrampro',
  storageBucket: 'devgrampro.appspot.com',
  messagingSenderId: '775754837391',
  appId: '1:775754837391:web:74c35f59a213c9b8f82ffa',
  measurementId: 'G-44S42N7FJL',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};

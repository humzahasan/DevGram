import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCLMam2FXHa_Sc_iBgmsWUF-hBndZyEcBQ',
  authDomain: 'devgram-6e3ab.firebaseapp.com',
  databaseURL: 'https://devgram-6e3ab.firebaseio.com',
  projectId: 'devgram-6e3ab',
  storageBucket: 'devgram-6e3ab.appspot.com',
  messagingSenderId: '16911598653',
  appId: '1:16911598653:web:f15973b3c8749c72171654',
  measurementId: 'G-88LR92LS9Z',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};

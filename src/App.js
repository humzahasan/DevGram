import React from 'react';
import './App.css';
import Post from './Post';

function App() {
  return (
    <div className='app'>
      <div className='app_header'>
        <h2>DevGram</h2>
      </div>
      <Post/>
      <Post/>
      <Post/>
    </div>
  );
}

export default App;

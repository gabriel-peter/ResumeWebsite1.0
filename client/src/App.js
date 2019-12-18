import React from 'react';
import './App.css';
import Resume from './components/resume/resume';
import Footer from './components/footer/footer';
import Spotify_Previewer from './components/spotify_previewer/spotify_previewer';

function App() {
  return (
    <div className="App">
      <header className="App-header Router-link">
        <a className='Router-link' href='/'>Resume</a>
        <a className='Router-link' href='/'>Game</a>
      </header>
      <Spotify_Previewer/>
      <div className='Resume'>
        <Resume/>
      </div>
        <Footer/>
    </div>
  );
}

export default App;

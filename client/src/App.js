import React from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/customers/customers';
import Resume from './components/resume/resume';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="App">
      <header className="App-header Router-link">
        <a className='Router-link' href='/'>Resume</a>
        <a className='Router-link' href='/'>Game</a>
      </header>
      <div className='Resume'>
        <Resume/>
      </div>
        <Footer/>
    </div>
  );
}

export default App;

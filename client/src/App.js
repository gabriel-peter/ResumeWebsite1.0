import React from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/customers/customers';
import Resume from './components/resume/resume';

function App() {
  return (
    <div className="App">
      <header className="App-header Router-link">
        <a className='Router-link' href='/'>Gabriel Peter</a>
        <a className='Router-link' href='/'>Welcome</a>
      </header>
      <Customers/>
      <Resume />
    </div>
  );
}

export default App;

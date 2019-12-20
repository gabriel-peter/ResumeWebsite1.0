import React from 'react';
// import './nav.css';
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <nav className='App-header Router-link'>
      <img src='/images/websiteIcon.png' height='64' width='64'/>
      <h1>Gabriel Peter</h1>
      <ul className='nav-links'>
          <Link to='/' className='Router-link'>
            <li>Resume</li>
          </Link>
          <Link to='/spotify' className='Router-link'>
            <li>Spotify</li>
          </Link>
          <Link to='/something' className='Router-link'>
            <li>Misc</li>
          </Link>
      </ul>
    </nav>

  );
}

export default Nav;

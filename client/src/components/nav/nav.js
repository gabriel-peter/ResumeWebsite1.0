import React from 'react';
import {Link} from 'react-router-dom';
function Nav() {
  return (
    <nav className='App-header Router-link'>
      <Link to='/'>
        <img className='profile-photo' src='/images/websiteIcon.png' alt='' height='64' width='64'/>
      </Link>
      <Link to='/' className='Router-link'>
      <h1>Gabriel Peter</h1>
      </Link>
      <ul className='nav-links'>
          <Link to='/more' className='Router-link'>
            <li>About Me</li>
          </Link>
          <Link to='/spotify' className='Router-link'>
            <img className='router-link-img' src={'/images/spotify.png'} alt={''} height={26}/>
            <li>Spotify Compatibility</li>
          </Link>
          </ul>
        <ul className='profile-links'>
          <a href='https://github.com/gabriel-peter' target='_blank' rel="noopener noreferrer">
            <li><img src={'/images/github.png'} alt={''} height={40} width={40}/></li>
          </a>
          <a href='https://www.linkedin.com/in/gabriel-peter/' target='_blank' rel="noopener noreferrer">
            <li><img src={'/images/LI-In-Bug.png'} alt={''} height={40} width={47}/></li>
          </a>
          </ul>  
    </nav>

  );
}

export default Nav;

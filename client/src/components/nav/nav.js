import React from 'react';
import {Link} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
// import Navbar from 'react-bootstrap/Navbar';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NavbarHeader() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src="/images/websiteIcon.png"
              width="26"
              height="26"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />{' '}
            Gabriel Peter
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">

            <LinkContainer to="/mix">
            <Nav.Link>
              <Row>
                <img
                  src="/images/drink.png"
                  width="26"
                  height="26"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />{' '}
                <p>Mix Assist 1.0<Badge>New</Badge></p>
              </Row>
            </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/spotify">
            <Nav.Link>
              <Row>
                <img
                  src="/images/spotify.png"
                  width="26"
                  height="26"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />{' '}
                <p>Spotify Compatibility<Badge>Updated</Badge></p>
              </Row>
            </Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <Nav.Link href='https://github.com/gabriel-peter'>
              <img
                src='/images/drink.png'
                width="26"
                height="26"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />{' '}
            </Nav.Link>
            <Nav.Link href='https://www.linkedin.com/in/gabriel-peter/'>
              <img
                src='/images/LI-In-Bug.png'
                width="26"
                height="26"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />{' '}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    {/* <nav className='App-header Router-link'>
      <Link to='/'>
        <img className='profile-photo' src='/images/websiteIcon.png' alt='' height='64' width='64'/>
      </Link>
      <Link to='/' className='Router-link'>
      <h1>Gabriel Peter</h1>
      </Link>
      <ul className='nav-links'>
          <Link to='/mix' className='Router-link'>
            <img className='router-link-img' src={'/images/drink.png'} alt={''} height={26}/>
            <li>Mix Assist 1.0</li>
            <Badge variant="light">New</Badge>
          </Link>
          <Link to='/spotify' className='Router-link'>
            <img className='router-link-img' src={'/images/spotify.png'} alt={''} height={26}/>
            <li>Spotify Compatibility</li>
            <Badge variant="light">Updated</Badge>
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
    </nav> */}
    </div>
  );
}

export default NavbarHeader;

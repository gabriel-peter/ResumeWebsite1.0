import React from 'react';
import {Link} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../App.css'
function NavbarHeader() {
  return (
    <div>
      <Navbar defaultExpanded={false} collapseOnSelect variant="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src="/images/websiteIcon.png"
              width="40"
              height="40"
              // className="d-inline-block align-top"
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
                <Col>
                <img
                  src="/images/drink.png"
                  width="26"
                  height="26"
                  // className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />{' '}
                Mix Assist (BETA)
                {/* <Badge variant="primary">New</Badge> */}
                </Col>
              </Row>
            </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/spotify">
            <Nav.Link>
              <Row>
                <Col>
                <img
                  src="/images/spotify.png"
                  width="26"
                  height="26"
                  // className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />{' '}
                Spotify Compatibility
                {/* <Badge pill variant="secondary">Updated</Badge> */}
                </Col>
              </Row>
              
            </Nav.Link>
            </LinkContainer>

          </Nav>
          <Nav>
            <Nav.Link href='https://github.com/gabriel-peter'>
              <img
                src='/images/github.png'
                width="26"
                height="26"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />{' '}
              My GitHub
            </Nav.Link>
            <Nav.Link href='https://www.linkedin.com/in/gabriel-peter/'>
              <img
                src='/images/LI-In-Bug.png'
                width="26"
                height="22"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />{' '}
              LinkedIn Profile
            </Nav.Link>
            <Nav.Link href='https://paypal.me/gabepeter?locale.x=en_US'>
              {/* <img
                src='/images/LI-In-Bug.png'
                width="26"
                height="22"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />{' '} */}
              Support my Development
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

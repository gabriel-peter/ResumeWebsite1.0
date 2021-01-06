import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar'

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import ImageCarousel from '../mixAssist/imageCarousel';

import '../../App.css'
class AboutMe extends Component {
    constructor(){
        super();
        this.state = {
        }
    }
    render() {
        return(
        <div>
            {/* <h1>Updated Home Page Coming soon ... In the mean time, checkout our: </h1>
            <h1><a href='/spotify'>Spotify Compatibility</a></h1> */}
            
            
            <Card className="text-center">
            <Card.Header><h1>About Me</h1></Card.Header>
            <Card.Body>
                {/* <Card.Title>Special title treatment</Card.Title> */}
                <Card.Text>
                This is a brief website showcasing side-projects that I toy with during breaks from school or work!
                </Card.Text>
                <Card.Text>
                I am currently a Junior with interests in Web-development, Python scripting, and even Systems-oriented code.
                </Card.Text>
                <Card.Text>
                Here is my latest BETA project (currently working on caching personal drinks), Check out what progress I've made so far.
                </Card.Text>
                <Button href='/mix' variant="primary">Try out MixAssist</Button>
                <footer className="blockquote-footer">
                    (This is also now Mobile Friendly)
                </footer>
            </Card.Body>
            <Card.Footer className="text-muted">Updated 12.26.20</Card.Footer>
            </Card>
            {/* <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        What?
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <h4>Mix Assist is an in-developement Drink and Cocktail database for taste enthusiast of the modern age.</h4>

                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        Classics, Retros, and Custom Cocktail Recipes at the Ready!
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <div><strong>600+ Cocktails Built-in:</strong></div>
                        <ImageCarousel/>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <h3>Progress until Release:</h3>
            <ProgressBar animated now={40} />
            <Button size='lg' variant='outline-primary' href='https://paypal.me/gabepeter?locale.x=en_US'>Support!</Button> */}
        </div>);
    }
}

export default AboutMe;
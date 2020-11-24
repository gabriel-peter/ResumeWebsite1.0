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
            
            <h1>Introducing MixAssist</h1>
            <div>BETA</div>
            <Accordion defaultActiveKey="0">
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
            <Button size='lg' variant='outline-primary' href='https://paypal.me/gabepeter?locale.x=en_US'>Support!</Button>
        </div>);
    }
}

export default AboutMe;
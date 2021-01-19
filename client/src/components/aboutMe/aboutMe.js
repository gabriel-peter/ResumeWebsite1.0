import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';

import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import ImageCarousel from '../mixAssist/imageCarousel';

import '../../App.css';
// https://medium.com/@augustinekwong/google-sign-in-for-reactjs-tutorial-1eb5d78ea2e6
import { useSelector, useDispatch, connect } from 'react-redux';
import {incrementCount, decrementCount} from '../../actions/';
const mapStateToProps = state => ({
    counter: state.counterReducer
});
const mapDispatchToProps = () => {
    return {
        incrementCount,
        decrementCount
    }
}
class AboutMe extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    
    render() {
        return(
        <div>
            <Card className="text-center">
            <Card.Header><h1>About Me</h1></Card.Header>
            <Card.Body>
                <Card.Text>
                This is a brief website showcasing side-projects that I toy with during breaks from school or work!
                </Card.Text>
                <Card.Text>
                I am currently a Junior with interests in Web-development, Python scripting, and even Systems-oriented code.
                </Card.Text>
                <Card.Text>
                Here is my latest BETA project (currently working on evolving the authetication protocol), Check out what progress I've made so far.
                </Card.Text>
                <Button href='/mix' variant="primary">Try out MixAssist</Button>
                <br />
                <footer className="blockquote-footer">
                    (This is also now Mobile Friendly)
                </footer>
                </Card.Body>
                
            
            <Card.Footer className="text-muted">Updated 12.26.20</Card.Footer>
            </Card>
            <br />
            <h3>Recent Website Upgrades:</h3>
                <ul>
                    <li className='item-complete'>Refactor code inheritance for future scalability</li>
                    <li className='item-complete'>Incorporate DB and back-end from old project</li>
                    <li className='item-complete'>Make Spotify Component more mobile responsive.</li>
                    <li className='item-complete'>Acquire SSL Certifs for HTTPS Support.</li>
                    <li className='item-complete'>Combine OAuth authentication for user personalization on Mix Assist</li>
                    <li className='item-complete'>Implement Redux</li>
                    <li>Develop Spotify Playlist Generator Algorithm</li>
                    <li className='item-complete'>Update DB for better schema</li>
                </ul>
        </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(AboutMe);
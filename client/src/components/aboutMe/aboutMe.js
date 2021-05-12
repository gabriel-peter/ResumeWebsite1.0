import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

                <Button href='/mix' variant="primary" block>Try out MixAssist</Button>
                <br/>
                <Button href='/spotify' variant="success" block>Compare our Spotify's</Button>
                
                <br />
                <footer className="blockquote-footer">
                    (This is also now Mobile Friendly)
                </footer>
                </Card.Body>

                
            
            <Card.Footer className="text-muted">Updated 12.26.20</Card.Footer>
            

            </Card>
            {/* <Card>
                <a href='/spotify'>
                    <Card.Header><h1>Spotify</h1></Card.Header>
                </a>
            </Card>

            <Card>
                <a href='/mix'>
                    <Card.Header><h1>Mix Assist</h1></Card.Header>
                </a>
            </Card> */}
            
            <br />
        </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(AboutMe);
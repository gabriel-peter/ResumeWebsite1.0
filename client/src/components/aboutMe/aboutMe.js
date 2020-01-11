import React, { Component } from 'react';
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
            <h1>Stuff from my cover letter will go here</h1>
            <a href='https://paypal.me/gabepeter?locale.x=en_US' target='_blank' rel="noopener noreferrer">
                <div>Help me fund my new computer! :)</div>
            </a>
        </div>);
    }
}

export default AboutMe;
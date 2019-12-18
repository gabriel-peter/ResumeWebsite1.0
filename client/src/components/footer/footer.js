import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
    constructor () {
        super ();
        this.state = {

        }
    }
    render () {
        return (
            <div className='footer'>
                <h6>This was created with React and Express.js</h6>
            </div>
        );
    }
}

export default Footer;
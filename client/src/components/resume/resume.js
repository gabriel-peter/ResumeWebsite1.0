import React, { Component } from 'react';
import './resume.css';
import Interships from './internships/internships'
import Skills from './skills/skills'

class Resume extends Component {
    constructor(){
        super();
        this.state = {
            
        }
    }
    detectMobile() {
        if(window.innerWidth <= 800 && window.innerHeight <= 600) {
          return true;
        } else {
          return false;
        }
     }
    render() {
        return (
            <div>
                <div className='mobile-warning-title'>
                <h1>Please open this on a fullscreen browser</h1>
                <h3>Mobile Friendly Version coming soon!!!</h3>
                </div>
                <div className='resume-categories'>
                    <Interships/>
                    <Skills/>
                </div>
            </div>
        );
    }
}

export default Resume;

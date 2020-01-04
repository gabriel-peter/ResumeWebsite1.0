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
    render() {
        return (
            <div>
                <div className='resume-categories'>
                    {/* <Education/> */}
                    <Interships/>
                    <Skills/>
                </div>
                
            </div>
        );
    }
}

export default Resume;

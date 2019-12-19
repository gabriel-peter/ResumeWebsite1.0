import React, { Component } from 'react';
import './education.css';
import School from './school/school'

class Education extends Component {
    constructor(){
        super();
        this.state = {
            schools: [],
            visibility: false,
        }
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }
    toggleVisibility() {
        this.setState(state => ({
        visibility: !state.visibility,
    }));
    }

componentDidMount(){
    fetch('/api/education')
    .then(res => res.json())
    .then(schools => this.setState({schools},
        () => console.log('Schools fetched...')))
}

    render() {
        if (this.state.visibility) {
            return (
                <div>
                    <div className='menu-tab-div'>
                    <button className='menu-tab-button' onClick={this.toggleVisibility}>Education</button>
                    <img className='open-menu-arrow' src='/images/arrow.png' height='20' width='20' alt='arrow'/>
                    </div>
                    <div className='schools'> 
                        <div className='school'>
                            <School school = {this.state.schools[0]}/>
                        </div>
                        <div className='school'>
                            <School school = {this.state.schools[1]} />
                        </div>
                    </div>
                </div>
            );
            } else {
              return (
                <div className='menu-tab-div'>
                    <button className='menu-tab-button' onClick={this.toggleVisibility}>Education</button>
                    <img src='/images/arrow.png' height='20' width='20' alt='arrow'/>
                </div>
              );
            }
    }
}

export default Education;
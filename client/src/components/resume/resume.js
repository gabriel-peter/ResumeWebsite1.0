import React, { Component } from 'react';
import './resume.css';
import Contacts from '../contacts/contacts'

class Resume extends Component {
    constructor(){
        super();
        this.state = {
            
        }
    }

componentDidMount(){
    // fetch('/api/customer')
    // .then(res => res.json())
    // .then(customers => this.setState({customers},
    //     () => console.log('Customers fetched...', customers)))
}

    render() {
        return (
            <div>
            <h1>Gabriel Peter</h1>
            <Contacts/>
            </div>
        );
    }
}

export default Resume;

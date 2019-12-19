import React, { Component } from 'react';
import './school.css';

class School extends Component {
    constructor(){
        super();
        this.state = {
            schools: [],
        }
    }

    render() {
        return (
            <div>
                <h2>{this.props.school.name}</h2>
                <p>{this.props.school.location}</p>
                <p>{this.props.school.gpa}</p>
                <p>{this.props.school.concentration}</p>
                <p>{this.props.school.activities}</p>
            </div>
        );
    }
}

export default School;
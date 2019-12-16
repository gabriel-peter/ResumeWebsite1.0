import React, { Component } from 'react';
import './contact.css';

class Contact extends Component {
    constructor(props){
        super(props);
    }

componentDidMount(){
    
}

    render() {
        return (
            <div className='contact'>
            <h4 className='contact_name'>{this.props.name}</h4>
            <a href={this.props.link}>{this.props.content}</a>
            </div>
        );
    }
}

export default Contact;
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
                <img src={this.props.src} alt='img' height='42' width='42'/>
                <h3 className='contact-name'>{this.props.name}</h3>
                <a href={this.props.link}>{this.props.content}</a>
            </div>
        );
    }
}

export default Contact;
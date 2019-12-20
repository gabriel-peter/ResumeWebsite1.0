import React, { Component } from 'react';
import './contact.css';

class Contact extends Component {
    constructor(props){
        super(props);
        this.handleImageHover = this.handleImageHover.bind(this);
        this.state = {didHover: false}
    }

    handleImageHover() {   
        this.setState(state => ({
            didHover: true,
        }));
    }

    render() {
        return (
            <div onMouseEnter={this.handleImageHover} className='contact'>
                <img src={this.props.src} alt='img' height='42' width='42'/>
                <h3 className='contact-name contact-item'>{this.props.name}</h3>
                {/* {this.state.didHover &&  
                    <a className='contact-item' href={this.props.link}>{this.props.content}</a>  
                } */}
            </div>
        );
    }
}

export default Contact;
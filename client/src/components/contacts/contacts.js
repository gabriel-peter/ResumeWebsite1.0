import React, { Component } from 'react';
import './contacts.css';
import Contact from '../contact/contact'

class Contacts extends Component {
    constructor(){
        super();
        this.state = {
            contacts: [],
        }
    }

componentDidMount(){
    fetch('/api/contact')
    .then(res => res.json())
    .then(contacts => this.setState({contacts},
        () => console.log('Customers fetched...', contacts)))
}

    render() {
        return (
            <div>
            <h1>Contacts</h1>
            {this.state.contacts.map(contact => 
                <div className=""><Contact key={contact.id} name={contact.name} src={contact.img_src} content={contact.content} link={contact.link}/></div>)}
            </div>
        );
    }
}

export default Contacts;
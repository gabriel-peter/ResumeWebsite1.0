import React, { Component } from 'react';
import './contacts.css';
import Contact from '../contact/contact'

class Contacts extends Component {
    constructor(){
        super();
        this.state = {
            contacts: [],
            visibility: false,
        }
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }
    toggleVisibility() {
        this.setState(state => ({
        visibility: !state.visibility,
    }));
    }
    componentDidMount() {
        fetch('/api/contact')
        .then(res => res.json())
        .then(contacts => this.setState({contacts},
            () => console.log('Customers fetched...', contacts)))
    }

    render() {
        if (this.state.visibility) {
        return (
            <div>
              <button onClick={this.toggleVisibility}><h1>Contacts</h1></button>
                {this.state.contacts.map(contact => 
                <div ><Contact key={contact.id} name={contact.name} src={contact.img_src} content={contact.content} link={contact.link}/></div>)}
            </div>
        );
        } else {
          return (
            <div>
              <button onClick={this.toggleVisibility}><h1>Contacts</h1></button>
            </div>
          );
        }
    }
}

export default Contacts;
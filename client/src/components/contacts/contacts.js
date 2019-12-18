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
              <div className='menu-tab-div'>
                  <button className='menu-tab-button' onClick={this.toggleVisibility}>Contacts</button>
                  <img className='open-menu-arrow' src='/images/arrow.png' height='20' width='20' alt='arrow'/>
                </div>
              <div className='contacts'>
                {this.state.contacts.map(contact => 
                <div><Contact key={contact.id} name={contact.name} src={contact.img_src} content={contact.content} link={contact.link}/></div>)}
              </div>
            </div>
        );
        } else {
          return (
            <div className='menu-tab-div'>
                <button className='menu-tab-button' onClick={this.toggleVisibility}>Contacts</button>
                <img src='/images/arrow.png' height='20' width='20' alt='arrow'/>
            </div>
          );
        }
    }
}

export default Contacts;
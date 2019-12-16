import React, { Component } from 'react';
import './education.css';
// import Schools from 

class Education extends Component {
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

componentDidMount(){
    // fetch('/api/customer')
    // .then(res => res.json())
    // .then(customers => this.setState({customers},
    //     () => console.log('Customers fetched...', customers)))
}

    render() {
        if (this.state.visibility) {
            return (
                <div>
                  <button onClick={this.toggleVisibility}><h1>Education</h1></button>
                    <h3>This is my education</h3>
                </div>
            );
            } else {
              return (
                <div>
                  <button onClick={this.toggleVisibility}><h1>Education</h1></button>
                </div>
              );
            }
    }
}

export default Education;
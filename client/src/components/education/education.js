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
                    <button className='menu-tab-button' onClick={this.toggleVisibility}>Education</button>
                    <div className='schools'> 
                        <div className='school'>
                            <h2>Northeastern University</h2>
                            <p>sdoksodksdoksodksdoksdoskdosdosdojsdoj</p>
                        </div>
                        <div className='school'>
                            <h2>Harvard-Westlake Highschool</h2>
                            <p>sdoksodksdoksodksdoksdoskdosdosdojsdoj</p>
                        </div>
                    </div>
                </div>
            );
            } else {
              return (
                <div>
                  <button className='menu-tab-button' onClick={this.toggleVisibility}>Education</button>
                </div>
              );
            }
    }
}

export default Education;
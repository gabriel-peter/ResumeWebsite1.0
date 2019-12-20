import React, { Component } from 'react';
// import './interships.css';

class Interships extends Component {
    constructor(){
        super();
        this.state = {
            internships: [],
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
                    <div className='menu-tab-div'>
                        <button className='menu-tab-button' onClick={this.toggleVisibility}>Interships</button>
                        <img className='open-menu-arrow' src='/images/arrow.png' height='20' width='20' alt='arrow'/>
                    </div>
                    {/* <div className='schools'> 
                        <div className='school'>
                            <h2>Northeastern University</h2>
                            <p>sdoksodksdoksodksdoksdoskdosdosdojsdoj</p>
                        </div>
                        <div className='school'>
                            <h2>Harvard-Westlake Highschool</h2>
                            <p>sdoksodksdoksodksdoksdoskdosdosdojsdoj</p> */}
                        {/* </div> */}
                    {/* </div> */}
                </div>
            );
            } else {
              return (
                <div className='menu-tab-div'>
                    <button className='menu-tab-button' onClick={this.toggleVisibility}>Interships</button>
                    <img src='/images/arrow.png' height='20' width='20' alt='arrow'/>
                </div>
              );
            }
    }
}

export default Interships;
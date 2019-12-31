import React, { Component } from 'react';
// import './interships.css';
import MapContainer from './google-maps';
class Interships extends Component {
    constructor(){
        super();
        this.state = {
            internships: [],
            visibility: true,
            name: '',
            title: '',
            location: '',
            body: <div></div>,
        }
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.updateLocationPanel = this.updateLocationPanel.bind(this);
    }
    toggleVisibility() {
        this.setState(state => ({
        visibility: !state.visibility,
    }));
    }

    updateLocationPanel(prop, marker) {
        this.setState({
            name : prop.name,
            title: prop.title,
            location: prop.location,
            body: prop.body,
        })
    }
    render() {
        if (this.state.visibility) {
            return (
                <div>
                    <div className='menu-tab-div'>
                        <button className='menu-tab-button' onClick={this.toggleVisibility}>Interships</button>
                        <img className='open-menu-arrow' src='/images/arrow.png' height='20' width='20' alt='arrow'/>
                    </div>
                    <div className='map-container'>
                        <div className='map-info'>
                            {this.state.name === '' ? (
                            <h3>Click a location to learn more about it</h3>
                            ):(
                            <div className='location-body'>
                                <h1>{this.state.name}</h1>
                                <h4 className='location-text'>{this.state.location}</h4>
                                <h3>{this.state.title}</h3>
                                <div>{this.state.body}</div>
                            </div>
                            )}   
                        </div>
                        <MapContainer
                            updateLocationPanel={this.updateLocationPanel}
                        />
                    </div> 
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
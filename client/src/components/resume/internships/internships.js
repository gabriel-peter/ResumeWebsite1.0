import React, { Component } from 'react';
import MapContainer from './google-maps';

class WorkExperience extends Component {
    constructor(){
        super();
        this.state = {
            internships: [],
            visibility: true,
            name: '',
            title: '',
            location: '',
            images: '',
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
            images: prop.images,
        })
    }
    render() {
        if (this.state.visibility) {
            return (
                <div>
                    <div className='menu-tab-div'>
                        <button className='menu-tab-button' onClick={this.toggleVisibility}>Important Locations</button>
                        <img className='open-menu-arrow' src='/images/arrow.png' height='20' width='20' alt='arrow'/>
                    </div>
                    <div className='map-container'>
                        <div className='map-info'>
                            {this.state.name === '' ? (
                            <div className='map-hint'>Click a location to learn more about it</div>
                            ):(
                            <div>
                            <div className='big-name'>{this.state.name}</div>
                            <div className='map-info-items'>
                                <div>   
                                <div className='location-text'>{this.state.location}</div>
                                <div>{this.state.title}</div>
                                <div>{this.state.body}</div>
                                </div>
                                <img className='location-image' src={this.state.images} alt={''} width={200} height={200}/>
                            </div>
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
                    <button className='menu-tab-button' onClick={this.toggleVisibility}>Important Locations</button>
                    <img src='/images/arrow.png' height='20' width='20' alt='arrow'/>
                </div>
              );
            }
    }
}

export default WorkExperience;
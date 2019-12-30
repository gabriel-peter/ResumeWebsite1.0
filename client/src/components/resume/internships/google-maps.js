import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react';
 
const style = {
    width: '40%',
    height: '400px'
  }

export class MapContainer extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
      };

    onMarkerClick = (props, marker, e) =>
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
        });
    
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
        }
    };


  render() {
    const google=this.props.google
    return (
      <Map 
        google={google} 
        zoom={3}
        initialCenter={{
            lat: 39.8283,
            lng: -98.5795
          }}
        style={style}
        >
        <Marker
            onClick={this.onMarkerClick}
            title={'The marker`s title will appear as a tooltip.'}
            name={'VL'}
            position={{lat: 37.4528649, lng: -122.1829978}} 
            icon={{
                url: "/images/visuallabs.png",
                anchor: new google.maps.Point(32,32),
                scaledSize: new google.maps.Size(32,32)
            }} 
        />
        <Marker
            onClick={this.onMarkerClick}
            title={'The marker`s title will appear as a tooltip.'}
            name={'USC'}
            position={{lat: 34.0224, lng: -118.2851}} 
            icon={{
                url: "/images/usc.png",
                anchor: new google.maps.Point(32,32),
                scaledSize: new google.maps.Size(32,32)
            }} 
        />
        <Marker
            onClick={this.onMarkerClick}
            title={'The marker`s title will appear as a tooltip.'}
            name={'NEU'}
            position={{lat: 42.3398, lng: -71.0892}} 
            icon={{
                url: "/images/neu.png",
                anchor: new google.maps.Point(32,32),
                scaledSize: new google.maps.Size(32,32)
            }} 
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
                <h1>{this.state.selectedPlace.name}</h1>
              <h4>{this.state.selectedPlace.title}</h4>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyB4ZrcYecpeQwsvLaRxrnM4IFbI09P4jPA')
})(MapContainer)
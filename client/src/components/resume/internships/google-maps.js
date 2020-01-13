import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react';
// https://www.npmjs.com/package/google-maps-react#sample-usage-with-lazy-loading-google-api
const style = {
    borderRadius: '3%',
    width: '600px',
    height: '400px',
}

const hwBody=
    <div id='hw-body'>
        <div>
        <p>Main Activities</p>
        <ul>
            <li>Internationally-Touring Jazz Band</li>
            <li>Lacrosse</li>
            <li>Student Ambassador Co-Chair</li>
            <li>Science Bowl and Robotics Team Members</li>
        </ul>
        </div>
    </div>;

const vlBody=
<div id='vl-body'>
    <div>
    <p>Main Activities</p>
    <ul>
        <li>Vanilla Front-End, Flask (Python) Backend</li>
        <li>Android Development (Java)</li>
        <li>Arduino Developement - Both Hardware/Software (C++)</li>
    </ul>
    </div>
</div>;

const uscBody=
<div id='usc-body'>
    <div>
    <p>Main Activities</p>
    <ul>
        <li>MATLAB Data Processing</li>
        <li>Bio-mechanics study on Salmon Tissue (Wild vs. Farmed)</li>
        <li>Laser Laboratory Assistant</li>
    </ul>
    </div>
</div>;

const neuBody=
<div id='neu-body'>
    <div>
    <p>Main Activities</p>
    <ul>
        <li><a href='https://www.khoury.northeastern.edu/current-students/undergraduate/student-groups-and-organizations/code-4-community/'>
            Front-End Engineer for Non-Profit 'Code 4 Community'</a></li>
        <li><a href='http://www.ieee.neu.edu/'>
            E-Board IEEE Member</a></li>
        <li><a href='https://www.northeastern.edu/rise/awards/'>Cloud Computing Research</a></li>
        <li>ITS CxT Employee</li>
    </ul>
    </div>
</div>;

export class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            apiKey: '',
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        };
    }
    onMarkerHover = (prop, marker, e) => {
        if(this.state.selectedPlace.name !== prop.name) {
            this.setState({
            selectedPlace: prop,
            activeMarker: marker,
            showingInfoWindow: true
            });
            this.props.updateLocationPanel(prop, marker);
        }
    }   
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
        zoom={3.5}
        initialCenter={{
            lat: 39.8283,
            lng: -98.5795
          }}
        style={style}
        >
        <Marker
            onClick={this.onMarkerHover}
            title={'3-month Internship'}
            location={'Menlo Park, CA'}
            body={vlBody}
            images={'/images/arduino-vl.png'}
            name={'Visual Labs Inc.'}
            position={{lat: 37.4528649, lng: -122.1829978}} 
            icon={{
                url: "/images/visuallabs.png",
                anchor: new google.maps.Point(32,32),
                scaledSize: new google.maps.Size(32,32)
            }} 
        />
        <Marker
            onClick={this.onMarkerHover}
            title={"3-month BioMedical Internship at "}
            name={'University of Southern California'}
            location={"Viterbi's Armani Labs, Los Angeles, CA"}
            body={uscBody}
            images={'/images/salmon.JPG'}
            position={{lat: 34.0224, lng: -118.2851}} 
            icon={{
                url: "/images/usc.png",
                anchor: new google.maps.Point(32,32),
                scaledSize: new google.maps.Size(32,32)
            }} 
        />
        <Marker
            onClick={this.onMarkerHover}
            title={'Computer Engineering Major'}
            name={'Northeastern University'}
            body={neuBody}
            images={'/images/rise.png'}
            location={'Boston, MA'}
            position={{lat: 42.3398, lng: -71.0892}} 
            icon={{
                url: "/images/neu.png",
                anchor: new google.maps.Point(32,32),
                scaledSize: new google.maps.Size(32,32)
            }} 
        />
        <Marker
            onClick={this.onMarkerHover}
            title={'Graduated June 2018'}
            name={'Harvard-Westlake High School'}
            location={'Studio City, CA'}
            images={'/images/jazz.jpg'}
            body={hwBody}
            position={{lat: 34.0887, lng: -118.4340}} 
            icon={{
                url: "/images/hw.png",
                anchor: new google.maps.Point(32,32),
                scaledSize: new google.maps.Size(32,32)
            }} 
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
                <img className='location-image' src={this.state.selectedPlace.images} alt={''} width={150} height={150}/>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyB4ZrcYecpeQwsvLaRxrnM4IFbI09P4jPA')
})(MapContainer)
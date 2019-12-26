import './graph_styling.css';
import React, { Component } from 'react';
import * as $ from "jquery";
import Chart_Constructor from './chart_constructor';
import Client_Spotify_Data from './client_spotify_data';
import Personal_Spotify_Data from './personal_spotify_data';
class Spotify extends Component {
    constructor() {
        const access_token ='BQD7brPt2c3ENXb-WkF0X1a0IlM7HeFUrIRiay7TPRAd-2ekyVjltCLNLJTiS_eU6RBYFhCxZWq7qRwVMPWWLwYu-fEbE1A9HQeqzzqwQUHbFGG_OU3iF2Gkrt8B6jLb-mYIxtCKlKjXLD5DlRnQyVDSvIZ9L83VMm30TuZcDeU'
        super()
        this.state = {

        }
        this.getTopArtists(access_token)
    }
    foo(){
        return 'hello'
    }
    render() {
        return(
            <div>
                {/* <client */}
            </div>
        );
    }
}
import './graph_styling.css';
import React, { Component } from 'react';
import * as $ from "jquery";
import Chart_Constructor from './chart_constructor';
class Personal_Spotify_Data extends Component {
    constructor() {
        const access_token ='BQD7brPt2c3ENXb-WkF0X1a0IlM7HeFUrIRiay7TPRAd-2ekyVjltCLNLJTiS_eU6RBYFhCxZWq7qRwVMPWWLwYu-fEbE1A9HQeqzzqwQUHbFGG_OU3iF2Gkrt8B6jLb-mYIxtCKlKjXLD5DlRnQyVDSvIZ9L83VMm30TuZcDeU'
        super()
        this.state = {

        }
        this.getTopArtists(access_token)
    }
    // https://developer.spotify.com/documentation/general/guides/authorization-guide/
    getTopArtists(token) {
        $.ajax({
            url: 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0',
            type: "GET",
            beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data) => {
                // this.analyseTermData(data)
                console.log('success')
            },
            error: function(xhr, textStatus, errorThrown) { 
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            }       
        });
}
    render() {
        return (
            <div>
                {/* <Chart_Constructor/> */}
            </div>
        ); 
    }
}

export default Personal_Spotify_Data;
import './graph_styling.css';
import React, { Component } from 'react';
import * as $ from "jquery";
import ChartConstructor from './chart_constructor';
class Personal_Spotify_Data extends Component {
    constructor(props) {
        super(props);
        const access_token ='BQD7brPt2c3ENXb-WkF0X1a0IlM7HeFUrIRiay7TPRAd-2ekyVjltCLNLJTiS_eU6RBYFhCxZWq7qRwVMPWWLwYu-fEbE1A9HQeqzzqwQUHbFGG_OU3iF2Gkrt8B6jLb-mYIxtCKlKjXLD5DlRnQyVDSvIZ9L83VMm30TuZcDeU'
        const refresh_token = 'AQAoiRmHjuYjbQz51gEUXjL98e_PlSwPcGonvYfxS6oOs7tHhakvYvWhohZNwrNMx1k4OnIdyeKBg77UL9w9xpmQC0MpAZ92uHpzobO0pFNaADhU9eKHzeg8OtmNatvoY84';
        // https://developer.spotify.com/documentation/general/guides/authorization-guide/
        this.state = {
            access_token: access_token,
            refresh_token: refresh_token,
            loggedIn: access_token ? true : false,
            spotify_data: {
                top_artists: [{'x': 0, 'y': 0}],
                genre_weights: [{'x': 0, 'y': 'Undef'}],
                top_5_artists_graph: [{'x': 'Undef', 'y': 0,}],
                top_5_artists_images: [{'name': '', 'images': [{'url': ''}]}],
                top_artists_popularity: [{'x': 0, 'y': 0}],
                popularity_list: [{'x': 0, 'y': 0}], 
                average_artist_rank: 0, 
                genre_quantity: [{'x': 0, 'y': 0}], 
                genre_intersection: [{'x': 0, 'y': 0}],
                radialRankings: [{'angle': 360}], 
            }
        }
    }
    componentDidMount() {
        this.refreshToken();
    }
    refreshToken() {
        $.ajax({
            url: '/refresh_token',
            data: {
            'refresh_token': this.state.refresh_token 
            },
            success: (data) => {
                this.setState({
                    access_token: data.access_token
                }, () => {
                    this.getTopArtists();
                });
            }
        });
    }
    getTopArtists() {
        $.ajax({
            url: `https://api.spotify.com/v1/me/top/artists?time_range=${this.props.timeFrame}&limit=50&offset=0`,
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + this.state.access_token);
            },
            success: (data) => {
                const spotify_data = this.props.analyseTermData(data);
                this.setState({spotify_data});
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => { 
                console.log("Status: " + textStatus); 
                console.log("Error: " + errorThrown); 
            },
        });
    }
    render() {
        return (
            <div className='spotify-components'>
                <h2>I Like:</h2>
                <ChartConstructor
                    owner='me'
                    average_artist_rank={this.state.spotify_data.average_artist_rank}
                    top_5_artists_images={this.state.spotify_data.top_5_artists_images}
                    data1={this.state.spotify_data.radialRankings} 
                    data2={this.state.spotify_data.top_5_artists_graph}
                    genres={this.state.spotify_data.genre_weights}
                />
            </div>
        ); 
    }
}

export default Personal_Spotify_Data;
import './graph_styling.css';
import React, { Component } from 'react';
import * as $ from "jquery";
import Chart_Constructor from './chart_constructor';
class Personal_Spotify_Data extends Component {
    constructor() {
        const access_token ='BQD7brPt2c3ENXb-WkF0X1a0IlM7HeFUrIRiay7TPRAd-2ekyVjltCLNLJTiS_eU6RBYFhCxZWq7qRwVMPWWLwYu-fEbE1A9HQeqzzqwQUHbFGG_OU3iF2Gkrt8B6jLb-mYIxtCKlKjXLD5DlRnQyVDSvIZ9L83VMm30TuZcDeU'
        super()
    // https://developer.spotify.com/documentation/general/guides/authorization-guide/
    this.state = {
        access_token: access_token,
        loggedIn: access_token ? true : false,
        spotify_data: {
            top_artists: [{'x': 1, 'y': 1}],
            genre_weights: [{'x': 1, 'y': 'Undef'}],
            top_5_artists_graph: [{'x': 'Undef', 'y': 1}],
            top_5_artists_images: [{'name': '', 'images': [{'url': ''}]}],
            top_artists_popularity: [{'x': 1, 'y': 1}],
            popularity_list: [{'x': 1, 'y': 1}], 
            average_artist_rank: 0, 
            genre_quantity: [{'x': 1, 'y': 1}], 
            genre_intersection: [{'x': 1, 'y': 1}],
            radialRankings: [{'angle': 360}], 
        }
    }
}
getTopArtists(token) {
    $.ajax({
        url: 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0',
        type: "GET",
        beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + 'BQA4c2hVkhurxBBRsOhNYss6NGNFG2lKGW-GcObJvk9Hqci2CLhubSF-GbYK_FefifivhDxRK06riFxAFsce5lpcF1bgyyTsQS3cYMx4qr10BOmcWLfgvDjPaK9fo0_z05yTRoHtq1TpJ0ALk3qfqA1bBe6Sypo-IVI');
        },
        success: (data) => {
            const spotify_data = this.props.analyseTermData(data);
            this.setState({spotify_data});
        }
    });
}
componentDidMount(){
    // if(this.state.loggedIn) {
    //     this.getTopArtists(this.getHashParams().access_token);
    // } 
    this.getTopArtists(this.state.access_token)
}
    render() {
        return (
            <div>
                <h2>I Like:</h2>
                <Chart_Constructor
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
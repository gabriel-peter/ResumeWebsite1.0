import './graph_styling.css';
import React, { Component } from 'react';
import * as $ from "jquery";
import Chart_Constructor from './chart_constructor';
// https://medium.com/@jonnykalambay/now-playing-using-spotifys-awesome-api-with-react-7db8173a7b13?

class Spotify_Previewer extends Component {
    constructor(props){
        super(props);
        if (window.performance) {
            if (performance.navigation.type == 1) {
                window.location.replace('http://localhost:5000/login');
            }
          }
        this.state = {
            access_token: this.props.getHashParams().access_token,
            spotify_data: {
                top_artists: [{'x': 0, 'y': 0}],
                genre_weights: [{'x': 0, 'y': 'Undef'}],
                top_5_artists_graph: [{'x': 'Undef', 'y': 0}],
                top_5_artists_images: [{'name': '', 'images': [{'url': ''}]}],
                top_artists_popularity: [{'x': 0, 'y': 0}],
                popularity_list: [{'x': 0, 'y': 0}], 
                average_artist_rank: 0, 
                genre_quantity: [{'x': 0, 'y': 0}], 
                genre_intersection: [{'x': 0, 'y': 0}],
                radialRankings: [{'angle': 360}],  
            }
        }
        this.getTopArtists(this.state.access_token);
    }
    getTopArtists(token) {
        $.ajax({
            url: 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0',
            type: "GET",
            beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data) => {
                const spotify_data = this.props.analyseTermData(data);
                this.setState({spotify_data});
            }
        });
    }
    render() {
        return (
            <div className='spotify-components'>
                <h2>You Like:</h2>
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

export default Spotify_Previewer;
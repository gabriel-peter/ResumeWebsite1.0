import './graph_styling.css';
import React, { Component } from 'react';
import * as $ from "jquery";
import Chart_Constructor from './chart_constructor';
import Personal_Spotify_Data from './personal_spotify_data';
// https://medium.com/@jonnykalambay/now-playing-using-spotifys-awesome-api-with-react-7db8173a7b13?

class Spotify_Previewer extends Component {
    constructor(){
        super();
        const params = this.getHashParams()
        if (window.performance) {
            if (performance.navigation.type == 1) {
                window.location.replace('http://localhost:5000/login');
            }
          }
        this.state = {
            access_token: '',
            loggedIn: params.access_token ? true : false,
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
            xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data) => {
                const spotify_data = this.props.analyseTermData(data);
                this.setState({spotify_data});
            }
        });
    }
    componentDidMount(){
        if(this.state.loggedIn) {
            this.getTopArtists(this.getHashParams().access_token);
        } 
    }
    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
    render() {
        return (
            <div className='spotify-components'>
                <h1>How Similar Are Our Music Tastes?</h1>
                <h3>This is super important...</h3>
            {!this.state.loggedIn ? (
                
            <div className='spotify-button-div'>
                <a className='spotify-button-aref' href='http://localhost:5000/login'>
                    <img src='/images/spotify_button_image.png' height={50} width={150}/>
                    <p className='spotify-button-text'>{'Connect & Compare'}</p>
                </a>
            </div>
            ) : (
                <div>
                <h2>You Like:</h2>
                <Chart_Constructor
                    average_artist_rank={this.state.spotify_data.average_artist_rank}
                    top_5_artists_images={this.state.spotify_data.top_5_artists_images}
                    data1={this.state.spotify_data.radialRankings} 
                    data2={this.state.spotify_data.top_5_artists_graph}
                    genres={this.state.spotify_data.genre_weights}
                />
                </div>)} 
            </div>
        );
    }
}

export default Spotify_Previewer;
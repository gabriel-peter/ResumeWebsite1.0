import './graph_styling.css';
import React, { Component } from 'react';
import * as $ from "jquery";
import ChartConstructor from './chart_constructor';
class Personal_Spotify_Data extends Component {
    constructor(props) {
        super(props);
        // https://developer.spotify.com/documentation/general/guides/authorization-guide/
        this.state = {
            access_token: '',
            refresh_token: '',
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
            },
            topTracks: {items: []}
        }
    }
    componentWillMount() {
        if(this.props.user === 'me') {
            fetch('/api/personal-token')
            .then(res => res.json())
            .then(res => this.setState({access_token: res['access_token'], refresh_token: res['refresh_token']},
            () => this.refreshToken()))
        } else {
            this.setState({access_token: this.props.getHashParams().access_token}, 
                () => {
                    this.getTopArtists();
                    this.getTopTracks();
                });
            
        }
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
                    this.getTopTracks();
                });
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => { 
                console.log("Status: " + textStatus); 
                console.log("Error: " + errorThrown); 
            },
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
    getTopTracks() {
        $.ajax({
            url: `https://api.spotify.com/v1/me/top/tracks?time_range=${this.props.timeFrame}&limit=50&offset=0`,
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + this.state.access_token);
            },
            success: (data) => {
                this.setState({topTracks: data});
                // console.log(data);
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => { 
                console.log("Status: " + textStatus); 
                console.log("Error: " + errorThrown); 
            },
        });
    }
    render() {
        console.log(this.state.topTracks);
        return (
            <div className='spotify-components'>
                <h2>{this.props.user === 'me' ? 'I' : 'You'} Like:</h2>
                <ChartConstructor
                    owner={this.props.user}
                    average_artist_rank={this.state.spotify_data.average_artist_rank}
                    top_5_artists_images={this.state.spotify_data.top_5_artists_images}
                    data1={this.state.spotify_data.radialRankings} 
                    data2={this.state.spotify_data.top_5_artists_graph}
                    genres={this.state.spotify_data.genre_weights}
                    topTracks={this.state.topTracks}
                />
            </div>
        ); 
    }
}

export default Personal_Spotify_Data;
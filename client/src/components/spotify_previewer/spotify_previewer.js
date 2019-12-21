import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import * as $ from "jquery";
import Chart_Constructor from './chart_constructor';
// https://medium.com/@jonnykalambay/now-playing-using-spotifys-awesome-api-with-react-7db8173a7b13?

const spotifyWebApi = new Spotify();

class Spotify_Previewer extends Component {
    constructor(){
        super();
        const params = this.getHashParams()
        this.state = {
            access_token: '',
            loggedIn: params.access_token ? true : false,
            nowPlaying: {
                name: 'Not Checked',
                image: ''
            },
        }
        if (params.access_token) {
            spotifyWebApi.setAccessToken(params.access_token);
            this.setState(({
                access_token: params.access_token
            }));
        }
    }
    analyseData(data) {
        // console.log(data);
        console.log(data.items)
        let average_artist_rank = data.items.reduce((accumulator, currentValue) => accumulator + currentValue.popularity, 0)/50;
        let top_artists = data.items.reduce((accumulator, currentValue) => accumulator.concat(currentValue.name), []);
        let genre_quantity = data.items.reduce((accumulator, currentValue) => accumulator.concat([currentValue.genres]), []).flat();
        this.setState({top_artists, average_artist_rank, genre_quantity});
        console.log(this.state.top_artists)
        console.log(this.state.average_artist_rank);
        console.log(this.state.genre_quantity);
        const test_array = ["pop", "rap", "ssdsdsd"];
        const genre_intersection = test_array.filter(element => genre_quantity.includes(element));
        console.log('intersection', genre_intersection)
    }
    // getNowPlaying() {
    //     spotifyWebApi.getMyCurrentPlaybackState ()
    //     .then((response) => {
    //         this.setState({
    //             name: response.item.name,
    //             image: response.item.album.images[0].url
    //         })
    //         console.log(this.state.name);
    //     }) 
    // }
    getTopArtists() {
        $.ajax({
            url: "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0",
            type: "GET",
            beforeSend: (xhr) => {
              xhr.setRequestHeader("Authorization", "Bearer " + this.getHashParams().access_token);
            },
            success: (data) => {
              this.analyseData(data);
            }
        });
    }
    componentDidMount(){
        if(this.state.loggedIn) {
            this.getTopArtists();
        }
        // this.forceUpdate();
        
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
                <div>
                    <h1>How Similar Are Our Music Tastes?</h1>
                    <h3>This is super important in order to ensure..</h3>
                {!this.state.loggedIn ? (
                <div>
                    <a href='http://localhost:5000/login'>
                        <button>'Do Something with Spotify'</button>
                    </a>
                </div>
                ) : (
                <div>
                    <h3>{this.state.name}</h3>
                    <img src={this.state.image} alt='Album Image' height='auto' width='auto'/>
                </div>
                )
                } 
                <Chart_Constructor/>
                </div>
            );
    }
}

export default Spotify_Previewer;
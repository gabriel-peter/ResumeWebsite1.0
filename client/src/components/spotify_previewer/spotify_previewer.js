import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import * as $ from "jquery";
import { URL, URLSearchParams } from 'url';
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
        var total_pop = 0
        var artists = []
        console.log(data);
        console.log(data.items)
        data.items.forEach(element => {
            console.log(element.name)
        });
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
        // if(this.state.loggedIn) {
        //     this.getNowPlaying();
        // }
        // this.forceUpdate();
        this.getTopArtists();
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
                </div>
            );
    }
}

export default Spotify_Previewer;
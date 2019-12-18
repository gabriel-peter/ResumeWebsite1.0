import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
// import './interships.css';

const spotifyWebApi = new Spotify();

class Spotify_Previewer extends Component {
    constructor(){
        super();
        const params = this.getHashParams()
        this.state = {
            loggedIn: params.access_token ? true : false,
            nowPlaying: {
                name: 'Not Checked',
                image: ''
            },
        }
        if (params.access_token) {
            spotifyWebApi.setAccessToken(params.access_token);
        }
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }
    toggleVisibility() {
        this.setState(state => ({
        visibility: !state.visibility,
    }));
    }
    getNowPlaying() {
        spotifyWebApi.getMyCurrentPlaybackState ()
        .then((response) => {
            this.setState({
                name: response.item.name,
                image: response.item.album.images[0].url
            })
            console.log(this.state.name);
        })
        
    }

    componentDidMount(){
        if(this.state.loggedIn) {
            this.getNowPlaying();
        }
        this.forceUpdate();
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
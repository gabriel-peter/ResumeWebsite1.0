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
        const top_artists_popularity = [{'x': 4, 'y': 2}];
        this.state = {
            formattedResult: top_artists_popularity,
            access_token: '',
            loggedIn: params.access_token ? true : false,
            // nowPlaying: {
            //     name: 'Not Checked',
            //     image: ''
            // },
            short_term: {top_artists_popularity},
            medium_term: {top_artists_popularity},
            long_term: {top_artists_popularity},
        }
        if (params.access_token) {
            spotifyWebApi.setAccessToken(params.access_token);
            this.setState(({
                access_token: params.access_token
            }));
        }
    }
    piChartRankings(ranks) {
        let keys = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
        var values =[]
        keys.forEach(e => {
            var count = 0;
            ranks.forEach(element => {
                if(e === (Math.trunc((element-0.5)/10))*10) {
                    count ++;
                }
            })
            values.push(count)
        })
        // Radial Chart 
        var formattedResult = [];
        for (var i = 0; i <= values.length -1; i++) {
            if(values[i] !== 0) {
                formattedResult.push({'angle': values[i], 'label': 10*i, 'radius': i/2+5 })
            }
        }
        // Bar Series
        // var formattedResult = [];
        // for (var i = 0; i <= values.length -1; i++) {
        //     if(values[i] !== 0) {
        //         formattedResult.push({'x': i, 'y': values[i],})
        //     }
        // }
        
        console.log('formatted pi Chart Data',formattedResult)
        this.setState({
            formattedResult
        })
    }
    analyseTermData(data, term) {
        const test_array = ["pop", "rap", "ssdsdsd"];
        const items = data.items;
        let top_artists = items.reduce((accumulator, currentValue) => accumulator.concat(currentValue.name), []);
        // let top_artists_popularity = items.reduce((accumulator, currentValue) => accumulator.concat({'artist': currentValue.name, 'rank': currentValue.popularity}), []);
        let top_artists_popularity = items.reduce((accumulator, currentValue) => accumulator.concat(currentValue.popularity), []);
        let average_artist_rank = items.reduce((accumulator, currentValue) => accumulator + currentValue.popularity, 0)/50;
        let genre_quantity = items.reduce((accumulator, currentValue) => accumulator.concat([currentValue.genres]), []).flat(); 
        const genre_intersection = test_array.filter(element => genre_quantity.includes(element));
        if(term === 'short_term'){
            this.setState({ short_term: {top_artists,
                 top_artists_popularity, 
                 average_artist_rank, genre_quantity, genre_intersection,}});
        } else if(term === 'medium_term'){
            this.setState({ medium_term: {top_artists, 
                top_artists_popularity,
                 average_artist_rank, genre_quantity, genre_intersection,}});
        } else {
            this.setState({ long_term: {top_artists, 
                top_artists_popularity, 
                average_artist_rank, genre_quantity, genre_intersection,}});
            console.log(this.state.short_term.top_artists_popularity)
            console.log(this.state.medium_term.average_artist_rank);
            console.log(this.state.long_term.genre_quantity);
            this.piChartRankings(top_artists_popularity)
        }        
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
        ['short_term', 'medium_term', 'long_term'].map(e => {
            $.ajax({
                url: `https://api.spotify.com/v1/me/top/artists?time_range=${e}&limit=50&offset=0`,
                type: "GET",
                beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + this.getHashParams().access_token);
                },
                success: (data) => {
                this.analyseTermData(data, e);
                }
            });
        });
        
    }
    componentWillMount(){
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
                    <Chart_Constructor data={this.state.formattedResult}/>
                </div>
                )
                } 
                
                
                </div>
            );
    }
}

export default Spotify_Previewer;
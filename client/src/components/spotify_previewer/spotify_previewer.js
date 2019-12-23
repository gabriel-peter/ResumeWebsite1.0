import React, { Component } from 'react';
import * as $ from "jquery";
import Chart_Constructor from './chart_constructor';
import spotifyServiceWorker from './spotify-service-worker';
import './graph_styling.css';
// https://medium.com/@jonnykalambay/now-playing-using-spotifys-awesome-api-with-react-7db8173a7b13?

class Spotify_Previewer extends Component {
    constructor(){
        super();
        const params = this.getHashParams()
        const default_data = [{'x': 4, 'y': 2}];
        this.state = {
            access_token: '',
            loggedIn: params.access_token ? true : false,
            top_artists: default_data,
            top_5_artists: [{'x': 'A', 'y': 2}],
            top_artists_popularity: default_data,
            popularity_list: default_data, 
            average_artist_rank: default_data, 
            genre_quantity: default_data, 
            genre_intersection: default_data,
            radialRankings: [{'angle': 360}], 
        }
        if (params.access_token) {
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
        return formattedResult;
    }
    analyseTermData(data) {
        const test_array = ["pop", "rap", "ssdsdsd"];
        const items = data.items;
        const top_artists_names = items.reduce((accumulator, currentValue) => accumulator.concat(currentValue.name), []);
        const top_artists_popularity = items.reduce((accumulator, currentValue) => accumulator.concat({'artist': currentValue.name, 'rank': currentValue.popularity}), []);
        const popularity_list = items.reduce((accumulator, currentValue) => accumulator.concat(currentValue.popularity), []);
        const average_artist_rank = items.reduce((accumulator, currentValue) => accumulator + currentValue.popularity, 0)/50;
        const genre_quantity = items.reduce((accumulator, currentValue) => accumulator.concat([currentValue.genres]), []).flat(); 
        const genre_intersection = test_array.filter(element => genre_quantity.includes(element));
        const radialRankings = this.piChartRankings(popularity_list)
        const top_5_artists = (items.slice(0,5)).reduce((accumulator, currentValue) => accumulator.concat({'x': currentValue.name, 'y': currentValue.popularity}), []);
        this.setState( { 
            top_artists_names,
            top_5_artists,
            top_artists_popularity,
            popularity_list, 
            average_artist_rank, 
            genre_quantity, 
            genre_intersection,
            radialRankings 
        });     
    }
    getTopArtists(token) {
            $.ajax({
                url: 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0',
                type: "GET",
                beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: (data) => {
                    this.analyseTermData(data)
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
                <div>
                    <h1>How Similar Are Our Music Tastes?</h1>
                    <h3>This is super important...</h3>
                {!this.state.loggedIn ? (
                <div className='spotify-button-div'>
                    <a href='http://localhost:5000/login'>
                        <button className='spotify-button'>'Do Something with Spotify'</button>
                    </a>
                </div>
                ) : (
                <div>
                    <Chart_Constructor data1={this.state.radialRankings} data2={this.state.top_5_artists}/>
                </div>
                )
                } 
                
                
                </div>
            );
    }
}

export default Spotify_Previewer;
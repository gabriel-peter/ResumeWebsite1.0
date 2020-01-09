import './graph_styling.css';
import * as $ from 'jquery';
import React, { Component } from 'react';
import ClientSpotifyData from './client_spotify_data';
import PersonalSpotifyData from './personal_spotify_data';
import Comparison from './comparison';
class Spotify extends Component {
    constructor() {
        super();
        const params = this.getHashParams()
        this.state = {
            access_token: this.getHashParams().access_token,
            loggedIn: params.access_token ? true : false,
            currentSlide: 'Client',
            userData: {
                display_name: ''
            },
            timeFrame: 'long_term',
        }
        this.handleTimeFrameChange = this.handleTimeFrameChange.bind(this);
    }
    componentDidMount() {
        if(this.state.loggedIn) {
            this.getPersonalInformation();
        }
    }
    getPersonalInformation() {
        $.ajax({
            url: 'https://api.spotify.com/v1/me',
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + this.state.access_token);
            },
            success: (data) => {
                this.setState({userData: data});
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => { 
                console.log("Status: " + textStatus); 
                console.log("Error: " + errorThrown); 
            },
        });
    }
    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        // eslint-disable-next-line
        while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
    genreWeighting (genre_list) {
        const genres = Array.from(new Set(genre_list)); //reduces reduncy for more visually appealing data - slightly less accurate.
        var categories = ['Pop', 'Jazz', 'Dance', 'Classical', 'Indie', 'Folk', 'Rap', 'Country', 'Rock', 'Metal', 'Alternative', 'R&b', 'House'];
        const weights = [];
        categories.forEach(e => {
            var count = 0;
            genres.forEach(x => {
                if(x.includes(e.toLowerCase())) {
                    count ++;
                }
            });
            if(count>0) {
                weights.push({'y': e, 'x': (count/genres.length)*100}); // percent ration of total
            }
        });
        return weights;
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
                formattedResult.push({'angle': values[i],'subLabel': values[i].toString(10) + '%', 'label': (10*i).toString(10), 'radius': i/2+5 })
            }
        }
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
        const top_5_artists_graph = (items.slice(0,5)).reduce((accumulator, currentValue) => accumulator.concat({'x': currentValue.name, 'y': currentValue.popularity}), []);
        const top_5_artists_images = items.slice(0,5);
        const genre_weights = this.genreWeighting(genre_quantity);
        const spotify_data = {
            top_artists_names,
            top_5_artists_graph,
            top_5_artists_images,
            genre_weights,
            top_artists_popularity,
            popularity_list, 
            average_artist_rank, 
            genre_quantity, 
            genre_intersection,
            radialRankings,
        }
        return spotify_data;
    }
    handleSpotifyLogin() {
        fetch('/spotifyRedirectUri')
        .then(e => e.json())
        .then(data => {
            window.location = data;
        })
        .catch(error => { alert("Failed to prepare for Spotify Authentication"+  error) }); 
    }
    handleTimeFrameChange(event) {
        const savedSlide = this.state.currentSlide
        this.setState({timeFrame: event.target.value, currentSlide: 'Both'}, () => this.setState({currentSlide: savedSlide}))
      }
    render() {
        return(
            <div>
                <h1>How Similar Are Our Music Tastes?</h1>
                {!this.state.loggedIn ? (
                    <div>
                    <h3>Find out if our libraries match!</h3>
                    <h3>Click the button in order to fetch your long-term listening data for analysis!</h3>
                    <h5>(This service follows Spotify's <a href='https://developer.spotify.com/documentation/general/guides/authorization-guide/'>Auth-Flow Guidelines</a>)</h5>
                    <div className='spotify-button-div'>
                        <div className='spotify-button-aref' onClick={this.handleSpotifyLogin}>
                            <img src='/images/spotify_button_image.png' alt={''} height={50} width={167}/>
                            <p className='spotify-button-text'>{'Connect & Compare'}</p>
                        </div>
                    </div>
                    </div>
                ) : (
                <div>
                    <div>
                        <button onClick={() => this.setState({currentSlide: 'Client'})} 
                        className='slide-button'>{this.state.userData.display_name}</button>
                        <button onClick={() => this.setState({currentSlide: 'Me'})} 
                        className='slide-button'>Gabriel</button>
                        {/* <button onClick={() => this.setState({currentSlide: 'Both'})} 
                        className='slide-button'>Match?</button> */}
                        <div>
                        <label>
                        Pick your time-frame: 
                        <select id='time-menu' value={this.state.timeFrame} onChange={this.handleTimeFrameChange}>
                            <option value="long_term">Long Term (All Data)</option>
                            <option value="medium_term">Medium Term (Past 6 Months)</option>
                            <option value="short_term">Short Term (Past 4 Weeks)</option>
                        </select>
                        </label>
                        </div>
                    </div>
                    {this.state.currentSlide === 'Client' &&
                        <ClientSpotifyData
                            timeFrame={this.state.timeFrame}
                            analyseTermData={this.analyseTermData}
                            piChartRankings={this.piChartRankings}
                            genreWeighting={this.genreWeighting}
                            getHashParams={this.getHashParams}
                        />
                    }
                    {this.state.currentSlide === 'Me' &&
                        <PersonalSpotifyData
                            timeFrame={this.state.timeFrame}
                            analyseTermData={this.analyseTermData}
                            piChartRankings={this.piChartRankings}
                            genreWeighting={this.genreWeighting}
                        />
                    }
                    {this.state.currentSlide === 'Both' &&
                        <Comparison

                        />
                    }
                </div>
                )}
            </div>
        );
    }
}

export default Spotify;
import './graph_styling.css';
import React, { Component } from 'react';
import * as $ from "jquery";
import Chart_Constructor from './chart_constructor';
import Client_Spotify_Data from './client_spotify_data';
import Personal_Spotify_Data from './personal_spotify_data';
import Spotify_Previewer from './client_spotify_data';
class Spotify extends Component {
    constructor() {
        // const access_token ='BQD7brPt2c3ENXb-WkF0X1a0IlM7HeFUrIRiay7TPRAd-2ekyVjltCLNLJTiS_eU6RBYFhCxZWq7qRwVMPWWLwYu-fEbE1A9HQeqzzqwQUHbFGG_OU3iF2Gkrt8B6jLb-mYIxtCKlKjXLD5DlRnQyVDSvIZ9L83VMm30TuZcDeU'
        super();
        this.state = {

        }
        // this.getTopArtists(access_token)
    }
    genreWeighting (genres) {
        var categories = ['Pop', 'Rap', 'Country', 'Rock', 'Metal', 'Alternative', 'R&b', 'House'];
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
                formattedResult.push({'angle': values[i],'subLabel': values[i] + '%', 'label': 10*i, 'radius': i/2+5 })
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
        console.log('From Spotify Class',spotify_data)
        return spotify_data
    }
    render() {
        return(
            <div>
                <Client_Spotify_Data
                    analyseTermData={this.analyseTermData}
                    piChartRankings={this.piChartRankings}
                    genreWeighting={this.genreWeighting}
                />
                <Personal_Spotify_Data
                    analyseTermData={this.analyseTermData}
                    piChartRankings={this.piChartRankings}
                    genreWeighting={this.genreWeighting}
                />

                {/* <Compared_Spotify_Data

                /> */}
            </div>
        );
    }
}

export default Spotify;
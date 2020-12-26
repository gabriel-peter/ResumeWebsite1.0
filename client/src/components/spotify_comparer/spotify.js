import './graph_styling.css';
import * as $ from 'jquery';
import React, { Component } from 'react';
import ClientSpotifyData from './client_spotify_data';
import PersonalSpotifyData from './personal_spotify_data';
import Comparison from './comparison';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

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
        fetch('/api/spotifyRedirectUri')
        .then(e => e.json())
        .then(data => {
            window.location = data;
        })
        .catch(error => { alert("Failed to prepare for Spotify Authentication"+  error) }); 
    }
    handleTimeFrameChange(value) {
        console.log(value);
        const savedSlide = this.state.currentSlide;
        this.setState({timeFrame: value, currentSlide: 'Both'}, () => this.setState({currentSlide: savedSlide}))
      }
    render() {
        return(
            <div>
                {!this.state.loggedIn ? (
                    <div>
                    <Card>
                    <Card.Header as="h5">How Similar Are Our Music Tastes?</Card.Header>
                    <Card.Body>
                        <Card.Title>Find out if our libraries match!</Card.Title>
                        <Card.Text>
                        <p>Click the button in order to fetch your time-variable listening data for analysis!</p>
                        (This service follows Spotify's <a href='https://developer.spotify.com/documentation/general/guides/authorization-guide/'>Auth-Flow Guidelines</a>)
                        </Card.Text>
                        <Button size="lg" block pill onClick={this.handleSpotifyLogin}>
                            <Row>
                                <Col>{'Connect & Compare with  '}
                                <img src='/images/spotify_button_image.png' alt={''} height={35}/></Col>
                            </Row>
                        </Button>
                    </Card.Body>
                    </Card>
                    </div>
                ) : (
                <div>
                {/* <h1 className='mobile-warning-title-spotify'>Enter Fullscreen mode for content to appear! (Mobile Version Coming Soon)</h1> */}
                {/* <div className='loggedIn'> */}
                    <div>
                    <Nav variant="tabs">
                        <Nav.Item onClick={() => this.setState({currentSlide: 'Client'})}>
                            <Nav.Link>{this.state.userData.display_name}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick={() => this.setState({currentSlide: 'Me'})}>
                            <Nav.Link>Gabriel</Nav.Link>
                        </Nav.Item>
                        <NavDropdown title={this.state.timeFrame.replace('_', ' ') + ' data'} id="nav-dropdown">
                            <NavDropdown.Item onSelect={(value) => this.handleTimeFrameChange(value)} eventKey="long_term">Long Term (All Data)</NavDropdown.Item>
                            <NavDropdown.Item onSelect={(value) => this.handleTimeFrameChange(value)} eventKey="medium_term">Medium Term (Past 6 Months)</NavDropdown.Item>
                            <NavDropdown.Item onSelect={(value) => this.handleTimeFrameChange(value)} eventKey="short_term">Short Term (Past 4 Weeks)</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
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
                // </div>
                )}
            </div>
            
        );
    }
}

export default Spotify;

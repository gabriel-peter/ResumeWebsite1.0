import React, { Component } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ClockGraph from './clockGraph';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Popover from 'react-bootstrap/Popover';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { DiscreteColorLegend } from 'react-vis';
import * as $ from "jquery";

const ITEMS = [
    'Options',
    'Buttons',
    'Select boxes',
    'Date inputs',
    'Password inputs',
    'Forms',
    'Other'
  ];

function popover(key, value) {
    return(<Popover id="popover-basic">
      <Popover.Title as="h3">What is {key}?</Popover.Title>
      <Popover.Content>
        {value}
      </Popover.Content>
    </Popover>
  )};

const legendDescriptions = {
    'valence': 'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).',
    'danceability': 'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.',
    'energy': 'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.',
    'liveness': 'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.',
    'loudness': 'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.',
}

class SoundEvaluation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songData: {
                danceability: 0, 
                energy: 0, 
                liveness: 0, 
                tempo: 120, 
                time_signature: 4,
                valence: 0},
        }
    }
    componentDidMount() {
        this.getSongData();
    }
    getSongData() {
        $.ajax({
            url: `https://api.spotify.com/v1/audio-features/${this.props.song.id}`,
            type: "GET",
            beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + this.props.access_token);
            },
            success: (data) => {
                console.log(data);
                this.setState({songData: data});
            }
        });
    }
    render() {
        console.log(this.props.song);
        const total_seconds = Math.round(this.props.song.duration_ms/1000);
        const duration_s = total_seconds % 60;
        const duration_m = Math.round((this.props.song.duration_ms/1000 - duration_s) / 60);
        const album_name = this.props.song.album.name;
        const song_name = this.props.song.name;
        return(
        <div>
            <Pagination>
            <Pagination.Prev onClick={() => this.props.focusSong(null)}/>
            </Pagination>
            <Card.Title><h3>{song_name}</h3></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{album_name !== song_name && <h5>{album_name}</h5>}</Card.Subtitle>
            <h6>{this.props.song.artists.map((artist, index) => {
                if (index === this.props.song.artists.length - 1) {
                    return(<a href={artist.external_urls['spotify']}>{artist.name}</a>);
                } else {
                    return(<a href={artist.external_urls['spotify']}>{artist.name}, </a>);
                }
            })}</h6>
            <Card.Text>
                <div><i>{duration_m} minutes, {duration_s} seconds</i></div>
                <div><strong>{this.state.songData.tempo} bpm</strong></div>
                <div>{this.state.songData.time_signature}/{this.state.songData.time_signature} time signature</div>
            </Card.Text>
            <ClockGraph stats={this.state.songData}/>
            <Card.Text>
                {Object.keys(legendDescriptions).map((key, index) => {
                    return(
                    <div>
                        <OverlayTrigger trigger='focus' placement="top" overlay={popover(key, legendDescriptions[key])}>
                            <Button variant="link">{key.toUpperCase()}</Button>
                        </OverlayTrigger>
                        <b> {this.state.songData[key]}</b>
                    </div>);
                })}
            </Card.Text>
            
        </div>);
    }
}

export default SoundEvaluation;
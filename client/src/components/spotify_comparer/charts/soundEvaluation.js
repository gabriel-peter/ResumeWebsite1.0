import React, { Component } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ClockGraph from './clockGraph';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
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

class SoundEvaluation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songData: {danceability: 0, energy: 0, liveness: 0, tempo: 120, time_signature: 4},
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
                <div>{duration_m} minutes, {duration_s} seconds</div>
                <div>{this.state.songData.tempo} bpm</div>
                <div>{this.state.songData.time_signature}/{this.state.songData.time_signature} signature</div>
            </Card.Text>
            <ClockGraph stats={this.state.songData}/>
            <Card.Text>
                <div>Danceability {this.state.songData.danceability}</div>
                <div>Energy {this.state.songData.energy}</div>
                <div>Liveness {this.state.songData.liveness}</div>
            </Card.Text>
            
        </div>);
    }
}

export default SoundEvaluation;
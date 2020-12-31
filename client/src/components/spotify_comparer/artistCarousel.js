import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './graph_styling.css';

class ArtistCarousel extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }
    render() {
      return(
        <Carousel>
            {this.props.artists.map((artist, index) => {
                
                if(artist.name !== '') {
                    console.log(artist);
                    console.log(artist.followers);
                    return(
                        <Carousel.Item key={artist.id} interval={1000}>
                            <img
                                // style={{
                                // // 'height':"45rem",
                                // // 'width':"640px",
                                // 'background-position': 'center center',
                                // 'background-repeat': 'no-repeat'}}
                                className="d-block w-100"
                                // bsPrefix='carousel-img'
                                src={artist.images[0].url}
                                alt="First slide"
                                // fluid
                            />
                        <Carousel.Caption bsPrefix='translucent-caption carousel-caption'>
                        <h3>{index+1}. {artist.name}</h3>
                        <h6>{artist.genres[0] && artist.genres[0].toUpperCase()}</h6>
                        <div>Followers: {artist.followers.total.toLocaleString()}</div>
                        <div>Popularity: {artist.popularity}/100</div>
                        <br/>
                        <Button variant='outline-light' href={artist.uri}>Listen</Button>
                        </Carousel.Caption>
                    </Carousel.Item>);
                }
            })} 
        </Carousel>
      );
    }
}

export default ArtistCarousel;
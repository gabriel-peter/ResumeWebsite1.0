import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

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
                    return(<Carousel.Item key={artist.id} interval={1000}>
                        <img
                        className="center h-100"
                        src={artist.images[0].url}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>{index+1}. {artist.name}</h3>
                        <ul>
                            <li><strong>Followers: {artist.followers.total}</strong></li>
                            <li><strong>Popularity: {artist.popularity}</strong></li>
                        </ul>
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
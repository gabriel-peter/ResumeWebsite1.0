import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../graph_styling.css';

class ArtistCarousel extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }
    render() {
      return(
        <Card>
        <Carousel 
        // bsPrefix="m-auto align-self-center"
        >
            {this.props.artists.map((artist, index) => {
                
                if(artist.name !== '') {
                    // console.log(artist);
                    // console.log(artist.followers);
                    return(
                        <Carousel.Item 
                            key={artist.id}
                            interval={1000}
                            // className={'m-auto align-self-center'}
                            >
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
                        <Button variant='outline-light' href={artist.external_urls['spotify']}>Listen</Button>
                        {/* <Row>
                            <Col>
                                <Button variant='outline-light' href={artist.uri}>Listen</Button>
                            </Col>
                            {Object.keys(artist.external_urls).map(linkKey => {
                                return(
                                <Col>
                                    <Button variant='outline-light' href={artist.external_urls[linkKey]}>{linkKey}</Button>
                                </Col>);
                            })}
                            
                        </Row> */}
                        </Carousel.Caption>
                    </Carousel.Item>);
                }
            })} 
        </Carousel>
        </Card>
      );
    }
}

export default ArtistCarousel;
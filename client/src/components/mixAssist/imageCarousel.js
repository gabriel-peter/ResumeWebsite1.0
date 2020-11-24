import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

import '../../App.css'
class ImageCarousel extends Component {
    constructor(){
        super();
        this.state = {
        }
    }
    render() {
        return(
            <div>
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="slide-img"
                        src="/images/white_russian.png"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="slide-img"
                        src="/images/margarita.png"
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="slide-img"
                        src="/images/mojito.png"
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    </Carousel>
            </div>
        );
    }
}

export default ImageCarousel;

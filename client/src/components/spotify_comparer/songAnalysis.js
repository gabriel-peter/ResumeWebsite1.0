import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ArtistCarousel from './artistCarousel';
import {XYPlot, VerticalGridLines, XAxis, VerticalBarSeries, LabelSeries, RadialChart, HorizontalBarSeries, HorizontalGridLines, YAxis} from 'react-vis';
import './graph_styling.css';
// http://uber.github.io/react-vis/documentation

class SongAnalysis extends Component {
    constructor(props) {
      super(props)
      const index = 0;
      this.state= {
      }
    }
    render(){
      return(
      <Card>
          HI
      </Card>);
    }
}

export default SongAnalysis;
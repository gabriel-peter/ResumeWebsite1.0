import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ArtistCarousel from './artistCarousel';
import SongAnalysis from './songAnalysis';
import {XYPlot, VerticalGridLines, XAxis, VerticalBarSeries, LabelSeries, RadialChart, HorizontalBarSeries, HorizontalGridLines, YAxis} from 'react-vis';
import './graph_styling.css';
// http://uber.github.io/react-vis/documentation

class Chart_Constructor extends Component {
    constructor(props) {
      super(props)
      const index = 0;
      this.state= {
        index: index,
        index2: index,
        artistsWithFocus: [],
        owner: props.owner,
      }
    }
  render() {
      const data1 = this.props.data1
      const data2 = this.props.data2
      const genres = this.props.genres
      const chart_dimension = 300;
      const card_dimension = '375px';
      const { index } = this.state;
      var genre_max = {'x': 0, 'y': 'Undef'};
      genres.forEach(element => {
        if(element['x'] > genre_max['x']) {
          genre_max = element;
        }
      })
      const dataWithColor = data2.map((d, i) => ({...d, color: Number(i !== index)}));
      var artistsWithFocus = this.props.top_5_artists_images;
      const labelData = data2.map((d, idx) => ({
        x: d.x,
        y: d.y
      }));
      const { index2 } = this.state;
      const dataWithColor2 = genres.map((d, i) => ({...d, color: (Number(i !== index2)+1)}));
    return (
          <CardDeck>

          <Card>
          <ArtistCarousel artists={artistsWithFocus}/>
          </Card>

          {/* <Card style={{width: {card_dimension}}}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <XYPlot
                xType="ordinal"
                width={chart_dimension}
                height={chart_dimension}
                // https://codesandbox.io/s/bar-series-that-change-colors-on-mouseover-d9zh8
                onMouseLeave={() => this.setState({ index: null })}
              >
                <VerticalBarSeries
                  data={dataWithColor}    
                  animation={{damping: 9, stiffness: 300}}    
                  onNearestX={(d, { index }) => this.setState({ index })}
                />
                <LabelSeries 
                    data={labelData}
                    allowOffsetToBeReversed
                    getLabel={d => d.y}/>
              </XYPlot>
              <Card.Text>
                Hover over the graph to show {this.state.owner === 'you' ? ('your'):('my')} top 5 artists' popularity!
              </Card.Text>
            </Card.Body>
          </Card> */}

          <Card style={{width: {card_dimension}}}>
            <Card.Body>
              <Card.Title>Popularity Analysis</Card.Title>
                <RadialChart
                  data={data1}
                  width={chart_dimension}
                  height={chart_dimension}
                  animation={{damping: 9, stiffness: 300}}
                  showLabels={true}
                /> 
              <Card.Text>
                <div>{this.state.owner === 'you' ? ('Your'):('My')} favorite artists averaged around:</div>
                <h4>{this.props.average_artist_rank}/100</h4>
                <div>in their overall popularity score!</div>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: {card_dimension}}}>
            <Card.Body>
              <Card.Title>Genre Analysis</Card.Title>
              <XYPlot
                stackBy="x"
                yType="ordinal"
                margin={{left: 100}} 
                width={chart_dimension}
                height={chart_dimension}
                // https://codesandbox.io/s/bar-series-that-change-colors-on-mouseover-d9zh8
                onMouseLeave={() => this.setState({ index2: null })}
              >
                <YAxis/>
                <XAxis/>
                <HorizontalBarSeries
                  data={dataWithColor2} 
                  animation={{damping: 9, stiffness: 300}}    
                  onNearestX={(d, { index2 }) => this.setState({ index2 })}
                />
                <VerticalGridLines />
                <HorizontalGridLines />
              </XYPlot>
              <Card.Text>
                <div>{this.state.owner === 'you' ? ('Your'):('My')} {'music primarly consists of: '} 
                <h5>{genre_max['y']}</h5></div>
              </Card.Text>
            </Card.Body>
          </Card>

          <SongAnalysis/>
          </CardDeck>);
  }
}

export default Chart_Constructor;
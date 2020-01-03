import React, { Component } from 'react';
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
  // componentDidMount() {
  //   this.setState({artistsWithFocus: this.props.top_5_artists_images.map((d, i) => ({...d, highlight: 0}))})
  // }
  render() {
      const data1 = this.props.data1
      const data2 = this.props.data2
      const genres = this.props.genres
      const chart_dimension = 300;
      const { index } = this.state;
      var genre_max = {'x': 0, 'y': 'Undef'};
      genres.forEach(element => {
        if(element['x'] > genre_max['x']) {
          genre_max = element;
        }
      })
      const dataWithColor = data2.map((d, i) => ({...d, color: Number(i !== index)}));
      const artistsWithFocus = this.props.top_5_artists_images.map((d, i) => ({...d, highlight: i === index}));
      const labelData = data2.map((d, idx) => ({
        x: d.x,
        y: d.y
      }));
      const { index2 } = this.state;
      const dataWithColor2 = genres.map((d, i) => ({...d, color: (Number(i !== index2)+1)}));
    return (
      <div className='my-graphs'>
        <div className='top-5-artists_w_graph'>
          <div className='graph-and-directions'>
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
        <div>Hover over the graph to show {this.state.owner === 'you' ? ('your'):('my')} top 5 artists' popularity!</div>
        </div>
        <div className='my-top-artists'>
          {artistsWithFocus.map((artist) =>
            <div key={artist.name}>
              {!artist.highlight===true ? (
                <div className={'an-artist'}>
                  <a href={artist.uri}>
                    <img className='artist-image' src={artist.images[0].url} alt={''} height={200} width={200}/>
                  </a>
                </div>) : (
            <div className='highlighted-title'>{artist.name}</div>)}
          </div>
          )}
        </div>
        </div>
        <div className='secondary-analysis'>
        <div className='popularity-analysis'>
        <div className='big-number'>Popularity Analysis</div>
        <RadialChart
            data={data1}
            width={chart_dimension}
            height={chart_dimension}
            animation={{damping: 9, stiffness: 300}}
            showLabels={true}
            /> 
          <div className='average-popularity'>
            <div>{this.state.owner === 'you' ? ('Your'):('My')} favorite artists averaged around:</div>
            <div className='big-number'>{this.props.average_artist_rank}/100</div>
            <div>in their overall popularity score!</div>
          </div>
        
        </div>
        <div className='genre-analysis'>
        <div className='big-number'>Genre Analysis</div>
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
          <XAxis />
          <HorizontalBarSeries
            data={dataWithColor2} 
            animation={{damping: 9, stiffness: 300}}    
            onNearestX={(d, { index2 }) => this.setState({ index2 })}
          />
          <VerticalGridLines />
          <HorizontalGridLines />
        </XYPlot>
            <div>{this.state.owner === 'you' ? ('Your'):('My')} music primarly consists of:
              <div className='big-number'>{genre_max['y']}</div>
              </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Chart_Constructor;
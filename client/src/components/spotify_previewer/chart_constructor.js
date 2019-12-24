import React, { Component } from 'react';
import {XYPlot, LineSeries, YAxis, VerticalBarSeries, LabelSeries, RadialChart, RadarChart} from 'react-vis';
import './graph_styling.css'
// http://uber.github.io/react-vis/documentation

class Chart_Constructor extends Component {
    constructor(props) {
        super(props)
      this.state= {
        index: null,
        artistsWithFocus: props.top_5_artists_images
      }
    }
  render() {
      const data1 = this.props.data1
      const data2 = this.props.data2
      const data3 = this.props.data3
      const { index } = this.state;
      const dataWithColor = data2.map((d, i) => ({...d, color: Number(i !== index)}));
      const artistsWithFocus = this.props.top_5_artists_images.map((d, i) => ({...d, highlight: i === index}));
      const labelData = data2.map((d, idx) => ({
        x: d.x,
        y: d.y
      }));
    return (
      <div className='my-graphs'>
        <div className='top-5-artists_w_graph'>
        <XYPlot
          xType="ordinal"
          width={300}
          height={300}
          // https://codesandbox.io/s/bar-series-that-change-colors-on-mouseover-d9zh8
          onMouseLeave={() => this.setState({ index: null, artistsWithFocus: this.props.top_5_artists_images })}
        >
          <VerticalBarSeries
            data={dataWithColor}    
            animation={{damping: 9, stiffness: 300}}    
            onNearestX={(d, { index }) => this.setState({ index, artistsWithFocus })}
          />
          <LabelSeries 
              data={labelData}
              allowOffsetToBeReversed
              getLabel={d => d.y}/>
        </XYPlot>
        <div className='my-top-artists'>
          {this.state.artistsWithFocus.map((artist) =>
          <div className={`an-artist ${artist.highlight && 'highlighted-artist'}`}>
              <img src={artist.images[0].url} alt={''} height={200} width={200}/>
              {artist.highlight ? (<p><strong>{artist.name}</strong></p>):(<p>{artist.name}</p>)}
          </div>
          )}
        </div>
        </div>
        <div className='popularity-analysis'>
          <div className='average-popularity'>
            <div>Your favorite artists averaged around:</div>
            <div className='big-number'>{this.props.average_artist_rank}/100</div>
            <div>in their overall popularity score!</div>
          </div>
        <RadialChart
            // data={[ {angle: 1, radius: 10}, 
            //     {angle: 2, label: 'Super Custom label', subLabel: 'With annotation', radius: 20},
            //     {angle: 5, radius: 5, label: 'Alt Label'}, {angle: 3, radius: 14}, 
            //     {angle: 5, radius: 12, subLabel: 'Sub Label only', className: 'custom-class'} ]}
            data={data1}
            width={300}
            height={300}
            labelsStyle={{text: {fontSize: 20}}}
            
            animation={{damping: 9, stiffness: 300}}
            showLabels={true}/> 
        </div>
      </div>
    );
  }
}

export default Chart_Constructor;
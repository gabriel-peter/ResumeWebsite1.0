import React, { Component } from 'react';
import {XYPlot, YAxis, XAxis, VerticalBarSeries, LabelSeries, RadialChart, HorizontalBarSeries, HorizontalRectSeries} from 'react-vis';
import './graph_styling.css';
import verticalBarSeries from 'react-vis/dist/plot/series/vertical-bar-series';
// http://uber.github.io/react-vis/documentation

class Chart_Constructor extends Component {
    constructor(props) {
        super(props)
      this.state= {
        index: null,
        index2: null,
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
      const { index2 } = this.state;
      const dataWithColor2 = data3.map((d, i) => ({...d, color: (Number(i !== index2)+1)}));
      const labelData2 = data3.map((d, idx) => ({
          x: d.x,
          y: d.y
      }));
      console.log(data3)
      console.log(dataWithColor2)
      console.log(dataWithColor)
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
          <div>
          {!artist.highlight===true ? (
            <div className={'an-artist'}>
              <img src={artist.images[0].url} alt={''} height={200} width={200}/>
            </div>) : (
            <div className={'highlighted-title'}>{artist.name}</div>
            )}
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
            // animation={{damping: 9, stiffness: 300}}
            // showLabels={true}
            /> 
        </div>
        <div className='genre-analysis'>
          <XYPlot
          stackBy="x"
          yType="ordinal"
          width={300}
          height={300}
          // https://codesandbox.io/s/bar-series-that-change-colors-on-mouseover-d9zh8
          onMouseLeave={() => this.setState({ index2: null })}
        >
          <XAxis />
          <HorizontalBarSeries
            data={dataWithColor2}    
            animation={{damping: 9, stiffness: 300}}    
            onNearestX={(d, { index2 }) => this.setState({ index2 })}
          />
          <LabelSeries 
              data={labelData2}
              allowOffsetToBeReversed
              getLabel={d => d.y}/>
        </XYPlot>
        <h1>sfosjfosjfosjf</h1>
        </div>
      </div>
    );
  }
}

export default Chart_Constructor;
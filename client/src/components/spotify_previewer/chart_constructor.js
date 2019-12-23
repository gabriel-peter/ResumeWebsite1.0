import React, { Component } from 'react';
import {XYPlot, LineSeries, YAxis, VerticalBarSeries, LabelSeries, RadialChart, RadarChart} from 'react-vis';
import Artists_Preview from './artists_preview'
import {format} from 'd3-format';
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
        <div className='top-5-artists'>
        <XYPlot
          xType="ordinal"
          width={300}
          height={300}
          onMouseLeave={() => this.setState({ index: null, artistsWithFocus: this.props.top_5_artists_images })}
        >
          <VerticalBarSeries
            data={dataWithColor}    
            animation={{damping: 9, stiffness: 300}}    
            onNearestX={(d, { index }) => this.setState({ index, artistsWithFocus })}
          />
        </XYPlot>
        <div className='my-top-artists'>
          {this.state.artistsWithFocus.map((artist) =>
          <div class='an-artist'>
              <img src={artist.images[0].url} alt={''} height={150} width={150}/>
              {artist.highlight ? (<p><strong>{artist.name}</strong></p>):(<p>{artist.name}</p>)}
          </div>
          )}
        </div>
        </div>
        {/* <XYPlot  xType="ordinal" height={300} width={300}>
        <YAxis />
            <VerticalBarSeries 
              color={'orange'}
              data={data2}
              showLabels={true}
              
            />
             <LabelSeries 
              data={labelData}
              getLabel={d => d.x}
              style={
                {
                  text: {
                    fontSize: 8
                  }
              }}/>
        </XYPlot> */}

      {/* <RadarChart
        data={data3}
        // startingAngle={Math.PI / 7}
        domains={[
          {name: 'pop', domain: [0, 100],},
          {name: 'rap', domain: [0, 100],},
          {name: 'country', domain: [0, 100],},
          {name: 'rock', domain: [0, 100],},
          {name: 'alternative', domain: [0, 100],},
          {name: 'r&b', domain: [0, 100],}
        ]}
        width={300}
        height={300}
        style={{
          polygons: {
            strokeWidth: 1,
            strokeOpacity: 0.8,
            fillOpacity: 0.8
          },
          labels: {
            textAnchor: 'middle'
          },
          axes: {
            line: {
              fillOpacity: 0.8,
              strokeWidth: 0.5,
              strokeOpacity: 0.8
            },
            ticks: {
              fillOpacity: 0.3,
              strokeOpacity: 0.3,
            },
            text: {
              fontSize: 4
            }
          }
        }} */}
        {/* // colorRange={['red']}
        // hideInnerMostValues={true}
        // renderAxesOverPolygons={true}
        // showLabels={true}
        // onSeriesMouseOver={(data) => {
        //   this.setState({hoveredCell: data.event[0]});
        // }}
        // onSeriesMouseOut={() => this.setState({hoveredCell: false})}
      >
         {/* {hoveredCell && (
          <Hint value={{x: 0, y: 0}}>
            <div style={tipStyle}>{hoveredCell.name}</div>
          </Hint>
        )}  
      </RadarChart> */}
         
        {/* <XYPlot height={300} width={300}>
            <LineSeries data={data2} />
        </XYPlot> */}
        <RadialChart
            // data={[ {angle: 1, radius: 10}, 
            //     {angle: 2, label: 'Super Custom label', subLabel: 'With annotation', radius: 20},
            //     {angle: 5, radius: 5, label: 'Alt Label'}, {angle: 3, radius: 14}, 
            //     {angle: 5, radius: 12, subLabel: 'Sub Label only', className: 'custom-class'} ]}
            data={data1}
            width={300}
            height={300}
            animation={{damping: 9, stiffness: 300}}

            showLabels={true}/> 
      </div>
    );
  }
}

export default Chart_Constructor;
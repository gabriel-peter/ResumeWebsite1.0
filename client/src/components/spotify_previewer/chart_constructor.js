import React, { Component } from 'react';
import {XYPlot, LineSeries, VerticalBarSeries,MarkSeries, RadialChart, RadarChart} from 'react-vis';
// import RadarChart from 'radar-chart';
import {format} from 'd3-format';
import './graph_styling.css'
// http://uber.github.io/react-vis/documentation

class Chart_Constructor extends Component {
    constructor(props) {
        super(props)

    }
  render() {
      const data1 = this.props.data1
      const data2 = this.props.data2
      const data3 = this.props.data3
      const wideFormat = format('.3r');
      console.log(data2)
      console.log(data3)
    return (
      <div className='my-graphs'>
      <RadarChart
        data={data3}
        // startingAngle={Math.PI / 7}
        domains={[
          {name: 'pop', domain: [0, 100],},
          {name: 'rap', domain: [0, 100],},
          {name: 'country', domain: [0, 100],},
          {name: 'rock', domain: [0, 100],},
          {name: 'metal', domain: [0, 100],},
          {name: 'alternative', domain: [0, 100],}
        ]}
        width={400}
        height={400}
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
              fontSize: 9
            }
          }
        }}
        // colorRange={['red']}
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
        )}  */}
      </RadarChart>

        <XYPlot  xType="ordinal" height={300} width={300}>
            <VerticalBarSeries color={'orange'}
            data={data2}/>
         </XYPlot>
         
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
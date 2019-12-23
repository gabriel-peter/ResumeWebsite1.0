import React, { Component } from 'react';
import {XYPlot, LineSeries, YAxis, VerticalBarSeries, LabelSeries, RadialChart, RadarChart} from 'react-vis';
// import RadarChart from 'radar-chart';
import {format} from 'd3-format';
import './graph_styling.css'
// http://uber.github.io/react-vis/documentation

class Chart_Constructor extends Component {
    constructor(props) {
        super(props)
      this.state= {
        index: null
      }
    }
  render() {
      const data1 = this.props.data1
      const data2 = this.props.data2
      const data3 = this.props.data3
      const wideFormat = format('.3r');
      console.log(data2)
      console.log(data3)
      const { index } = this.state;
      const dataWithColor = data2.map((d, i) => ({...d, color: Number(i == index)}));
      console.log(dataWithColor)
      const labelData = data2.map((d, idx) => ({
        x: d.x,
        y: d.y
      }));
    return (
      <div className='my-graphs'>
        <XYPlot
          xType="ordinal"
          width={300}
          height={300}
          onMouseLeave={() => this.setState({ index: null })}
        >
          <VerticalBarSeries
            data={dataWithColor}        
            onNearestX={(d, { index }) => this.setState({ index })}
          />
        </XYPlot>
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

      <RadarChart
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
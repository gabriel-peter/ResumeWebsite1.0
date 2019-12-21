import React, { Component } from 'react';
import {XYPlot, LineSeries, VerticalBarSeries} from 'react-vis';
import './react-vis-graph-style.css';
// http://uber.github.io/react-vis/documentation

class Chart_Constructor extends Component {
  render() {
    const data = [
      {x: 0, y: 8},
      {x: 1, y: 5},
      {x: 2, y: 4},
      {x: 3, y: 9},
      {x: 4, y: 1},
      {x: 5, y: 7},
      {x: 6, y: 6},
      {x: 7, y: 3},
      {x: 8, y: 2},
      {x: 9, y: 0}
    ];
    return (
      <div className="">
        <XYPlot height={300} width={300}
              colorType="category"
              colorDomain={[0, 1, 2]}
              colorRange={['blue', 'yellow', 'red']}>
            <VerticalBarSeries data={data} />
        </XYPlot>
        <XYPlot height={300} width={300}>
            <LineSeries data={data} />
        </XYPlot>
      </div>
    );
  }
}

export default Chart_Constructor;
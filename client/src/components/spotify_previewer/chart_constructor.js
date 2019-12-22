import React, { Component } from 'react';
import {XYPlot, LineSeries, VerticalBarSeries, RadialChart} from 'react-vis';
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
        <RadialChart
            data={[ {angle: 1, radius: 10}, 
                {angle: 2, label: 'Super Custom label', subLabel: 'With annotation', radius: 20},
                {angle: 5, radius: 5, label: 'Alt Label'}, {angle: 3, radius: 14}, 
                {angle: 5, radius: 12, subLabel: 'Sub Label only', className: 'custom-class'} ]}
            width={300}
            height={300} />
      </div>
    );
  }
}

export default Chart_Constructor;
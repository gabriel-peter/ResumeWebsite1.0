import React, { Component } from 'react';
import {XYPlot, LineSeries, VerticalBarSeries,DiscreteColorLegend, RadialChart} from 'react-vis';
import './react-vis-graph-style.css';
// http://uber.github.io/react-vis/documentation

class Chart_Constructor extends Component {
    constructor(props) {
        super(props)

    }
  render() {
      const data = this.props.data
      console.log('from constructor', data)
    return (
      <div>
          {/* <XYPlot
  width={300}
  height={300}
  getX={d => d[0]}
  getY={d => d[1]}>
  <LineSeries
    color="red"
    data={[
      [1, 0],
      [2, 1],
      [3, 2]
    ]}/>
</XYPlot>
        <XYPlot height={300} width={300}
              colorType="category">
            <VerticalBarSeries 
            data={data} 
            labelsAboveChildren={true}/>
         </XYPlot>
         
        <XYPlot height={300} width={300}>
            <LineSeries data={data} />
        </XYPlot> */}

        
        <RadialChart
            // data={[ {angle: 1, radius: 10}, 
            //     {angle: 2, label: 'Super Custom label', subLabel: 'With annotation', radius: 20},
            //     {angle: 5, radius: 5, label: 'Alt Label'}, {angle: 3, radius: 14}, 
            //     {angle: 5, radius: 12, subLabel: 'Sub Label only', className: 'custom-class'} ]}
            data={data}
            width={300}
            height={300}
            animation={{damping: 9, stiffness: 300}}

            showLabels={true}/> 
            {/* <DiscreteColorLegend/> */}
      </div>
    );
  }
}

export default Chart_Constructor;
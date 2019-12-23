import React, { Component } from 'react';
import {XYPlot, LineSeries, VerticalBarSeries,MarkSeries, RadialChart} from 'react-vis';
import './graph_styling.css'
// http://uber.github.io/react-vis/documentation

class Chart_Constructor extends Component {
    constructor(props) {
        super(props)

    }
  render() {
      const data1 = this.props.data1
      const data2 = this.props.data2
      console.log(data2)
    return (
      <div className='my-graphs'>
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
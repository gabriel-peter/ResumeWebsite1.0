import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { XYPlot, ArcSeries, LabelSeries } from 'react-vis';
// import {EXTENDED_DISCRETE_COLOR_RANGE} from 'theme';

const PI = Math.PI;

export default class ClockExample extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            time: 0,
        }
        this.tempo = this.props.stats.tempo;
        this.time_signature = this.props.stats.time_signature;
        this.delay = 1/(this.props.stats.tempo/60);
    };

    getTempo() {
        if (this.state.time >= 2 * PI) {
            console.log('Reset');
            this.setState({time: 0});
        } else {
            console.log('Beat:', 1, this.state.time, this.state.time/(2*PI));
            this.setState(prev => ({time: (((2*PI)/this.time_signature)+ prev.time)}));
        }
      }
    
    componentDidMount() {
        console.log(this.tempo, this.delay);
        // this._timerId = setInterval(() => this.getTempo(), this.delay*1000);
    }
    
    componentWillUnmount() {
        clearInterval(this._timerId);
        this.setState({timerId: false});
    }
    
  render() {
    console.log(this.props.stats);
    const {time} = this.state;
    const danceability = Number(this.props.stats.danceability);
    const energy = Number(this.props.stats.energy);
    const liveness = Number(this.props.stats.liveness);
    const data = [
        // {y: 0, x: 0, time: time, label: `${Math.round(time/(PI/2))}/${this.time_signature}`, radius0: 0.1, radius: 0.9, color: 3},
        {y: 1, x: 1, time: danceability * 2 * PI, label: 'Dance', rotation: 15, radius0: 1, radius: 1.5, color: 0},
        {y: 1.6, x: 1.6, time: energy * 2 * PI, label: 'Energy', rotation: 15, radius0: 1.6, radius: 2.1, color: 1},
        {y: 2.2, x: 2.2, time: liveness * 2 * PI, label: 'Liveness', rotation: 15, radius0: 2.2, radius: 2.7, color: 2},
      ]
    console.log(danceability * 2 * PI, energy * 2 * PI);
    return (
    <Row>
    <Col>
      <XYPlot
        xDomain={[-3, 3]}
        yDomain={[-3, 3]}
        width={300}
        getAngle={d => d.time}
        getAngle0={d => 0}
        height={300}
        showLabels={true}
        margin={{left: 0, right: 30}} 
      >
        <ArcSeries
          animation={{
            // damping: 9,
            stiffness: 300
          }}
          showLabels={true}
          radiusDomain={[0, 3]}
          data={data}
        //   colorRange={EXTENDED_DISCRETE_COLOR_RANGE}
        />
        <LabelSeries animation allowOffsetToBeReversed data={data} />
      </XYPlot>
      </Col>
      <Col>
      {/* <DiscreteColorLegend height={200} width={300} items={ITEMS} /> */}
      </Col>
    </Row>);
  }
}

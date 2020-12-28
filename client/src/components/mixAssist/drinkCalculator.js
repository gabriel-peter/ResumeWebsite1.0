import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import {oz2ml, glasses} from './unitConverter';

class DrinkCalculator extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.ingredients);
        this.state = {
        }
    }
    
    getTotalVolume() {
        // TODO REWRITE
        let volume_in_ml = 0;
        // for (let key in this.props.ingredients) {
        //     if (key.includes('measurement')) {
        //         let v = this.props.ingredients[key];
        //         let unit = this.props.ingredients['unit'+key.slice(-1)];
        //         switch (unit) {
        //             case 'oz': 
        //                 v = oz2ml(v);
        //                 break;
        //             case 'ml':
        //                 v = v;
        //                 break;
        //             default: 
        //                 v = 0;
        //                 break;
        //         }
        //         volume += Number(v);
        //     }
        // }
        // return volume;

        // console.log(this.props.ingredients);
        // for (let idx in this.props.ingredients) {
        //     // console.log(ingredient)
        //     let type = this.props.ingredients[idx][0];
        //     let measurement = this.props.ingredients[idx][1].split(' ');
        //     // console.log(type, measurement);
        //     let unit = measurement.pop();
        //     let v = measurement[0];
        //     // BROKEN BECAUSE 1/2 = NaN
        //     console.log(type, v, unit);
        //     if (v.includes('/')) {
        //         if (v.split(' ').length > 1) {
        //             let mixedNum = v.split(' ');
        //             v = mixedNum[0];
        //             let fracs = mixedNum.slice(1, mixedNum.length - 1).split('/');
        //             v += fracs[0]/fracs[1];
        //         } else {
        //             let fracs = v.split('/');
        //             v = fracs[0]/fracs[1];
        //         }  
        //     }
        //     switch (unit) {
        //         case 'oz': 
        //             v = oz2ml(v);
        //             break;
        //         case 'ml':
        //             v = v;
        //             break;
        //         default: 
        //             v = 0;
        //             break;
        //     }
        //     volume_in_ml += Number(v);
        //     console.log(volume_in_ml);
        // }
        return volume_in_ml;
    }
    getTotalCalories() {
        let calories = 0;
        // for (let key in this.props.ingredients) {
        //     if (key.includes('measurement')) {
        //         let v = this.props.ingredients[key];
        //         volume += Number(v);
        //     }
        // }
        return calories;
    }
    getAlcoholContent(volume) {
        let volumeAlc = 0;
        // for (let key in this.props.ingredients) {
        //     if (key.includes('measurement')) {
        //         let v = this.props.ingredients[key];
        //         volume += Number(v);
        //     }
        // }
        if (volume == 0) {
            return 0;
        }
        return volumeAlc/volume;
    }
    getGlass(volume) {
        if (volume <= 30) {
            return 'Shot Glass';
        } else {
            return 'Collins Glass';
        }
    }
    render() {
        let totalVolume = this.getTotalVolume();
        let alcoholContent = this.getAlcoholContent(totalVolume);
        let recommendedGlass = this.getGlass(totalVolume);
        let totalCalories = this.getTotalCalories();
        return(
            <div>
                <Accordion>
                    <Card>
                    <Accordion.Toggle as={Button} eventKey="0">
                        <strong>Drink Calculator:</strong>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <ListGroup variant='flush'>
                            <ListGroup.Item>Alcohol Content: {alcoholContent}% | {alcoholContent*2} Proof</ListGroup.Item>
                            <ListGroup.Item>Calories: {totalCalories} kCal</ListGroup.Item>
                            <ListGroup.Item>Total Volume: {totalVolume} ml</ListGroup.Item>
                            <ListGroup.Item>Recommeded Glassware: <strong>{recommendedGlass}</strong></ListGroup.Item>
                            {/* TODO Put scale slider here! */}
                            <ListGroup.Item>Acidity Rating: {'Medium'}</ListGroup.Item>
                        </ListGroup>
                    </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>);
    }
}

export default DrinkCalculator;

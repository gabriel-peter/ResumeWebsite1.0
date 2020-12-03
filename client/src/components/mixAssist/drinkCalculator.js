import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import oz2ml from './unitConverter';

class DrinkCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    getTotalVolume() {
        let volume = 0;
        for (let key in this.props.ingredients) {
            if (key.includes('measurement')) {
                let v = this.props.ingredients[key];
                let unit = this.props.ingredients['unit'+key.slice(-1)];
                switch (unit) {
                    case 'oz': 
                        v = oz2ml(v);
                        break;
                    case 'ml':
                        v = v;
                        break;
                    default: 
                        v = 0;
                        break;
                }
                volume += Number(v);
            }
        }
        return volume;
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

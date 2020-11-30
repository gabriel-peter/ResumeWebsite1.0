import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import FocusDrink from './focusDrink';
import { Highlight } from 'react-vis';

class DrinkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drinks: this.props.drinks,
            focusedDrink: null,
        }
        this.focusDrink = this.focusDrink.bind(this)
    }
    focusDrink(index) {
        this.setState({focusedDrink: this.props.drinks[index]});
    }
    render() {
        console.log(this.state.focusedDrink);
        return(
        <div>{this.state.focusedDrink ?
            <FocusDrink 
                drink={this.state.focusedDrink}
                focusDrink={this.focusDrink}
            />
            :
            <ListGroup variant='flush'>
            {this.props.drinks.map((drink, index) => 
                <ListGroup.Item onClick={() => this.focusDrink(index)} key={index}>{drink.d_name}</ListGroup.Item>
            )}
            </ListGroup>
    }
        </div>);
    }
}

export default DrinkList;

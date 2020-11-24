import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class DrinkList extends Component {
    constructor() {
        super();
        this.state = {
            drinks: []
        }
    }
    componentDidMount() {
        fetch('/api/mix/search')
        .then(res => res.json())
        .then(res => this.setState({drinks: res}));
    }
    render() {
        // this.getDrinks();
        console.log(this.state.drinks)
        return(
        <div>
            <ListGroup>
            {this.state.drinks.map((drink, index) => 
                <ListGroup.Item key={index}>{drink.d_name}</ListGroup.Item>
            )}
            </ListGroup>
        </div>);
    }
}

export default DrinkList;
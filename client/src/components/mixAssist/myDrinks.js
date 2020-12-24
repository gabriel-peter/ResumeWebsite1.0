import React, { Component } from 'react';
import DrinkList from './drinkList/drinkList';


class MyDrinks extends Component {
    constructor() {
        super();
        this.fakeDrinks = [

        ]
        this.state = {
        }
    }
    render() {
        return (
        <div>
            <h1>MY DRINKS</h1>
            <DrinkList drinks={this.fakeDrinks}/>
        </div>);
    }
}

export default MyDrinks;
import React, { Component } from 'react';
import SearchBar from './search'
import DrinkList from './drinkList/drinkList'

class SearchDrink extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            console.log('enter press here! ')
            // make query to DB
        }
    }
    render() {
        return(
        <div>
            <SearchBar handleKeyPress={this.handleKeyPress}/>
            <br/>
            <DrinkList/>
        </div>);
    }
}

export default SearchDrink;
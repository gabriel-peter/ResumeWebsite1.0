import React, { Component } from 'react';
import DrinkList from './drinkList/drinkList';
import SearchBar from './search';


class MyDrinks extends Component {
    constructor(props) {
        super(props);
        this.searchInputRef = React.createRef();
        this.state = {
            drinks: [],
        }
    }
    handleKeyPress = (event, filter) => {
        // TODO sort
        console.log(this.searchInputRef.current.value, filter);

    }
    render() {
        return (
        <div>
            <h6>These are drinks you haved liked!</h6>
            <SearchBar searchInputRef={this.searchInputRef} handleKeyPress={this.handleKeyPress}/>
            <br/>
            <DrinkList addShoppingItem={this.props.addShoppingItem} drinks={this.props.savedDrinks} savedDrinks={this.props.savedDrinks}/>
        </div>);
    }
}

export default MyDrinks;
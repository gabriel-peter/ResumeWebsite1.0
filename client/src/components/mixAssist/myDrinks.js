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
    componentDidMount() {
        fetch('/saved-drinks')
        .then(res => res.json())
        .then(res => this.setState({drinks: res, resultLimit: res.length}));
    }
    handleKeyPress = (event, filter) => {
        // TODO
        console.log(this.searchInputRef.current.value);
    }
    render() {
        return (
        <div>
            <h1>MY DRINKS</h1>
            <SearchBar searchInputRef={this.searchInputRef} handleKeyPress={this.handleKeyPress}/>
            <br/>
            <DrinkList drinks={this.state.drinks}/>
        </div>);
    }
}

export default MyDrinks;
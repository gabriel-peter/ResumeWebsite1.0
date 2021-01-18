import React, { Component } from 'react';
import DrinkList from './drinkList/drinkList';
import SearchBar from './search';

import { connect } from 'react-redux';
import {dumpDrinks } from '../../actions/';
const mapStateToProps = state => ({
    savedDrinks: state.savedDrinkReducer
});
const mapDispatchToProps = () => {
    return {
        dumpDrinks
    }
}
class MyDrinks extends Component {
    constructor(props) {
        super(props);
        this.searchInputRef = React.createRef();
        this.attributeConv = {
            'Name': 'd_name',
            'Is Alcoholic': 'd_alcohol',
            'Category': 'd_cat',
            'Creator': 'd_glass',
            'Contains': 'd_ingredients',
        }
        this.state = {
            drinks: this.props.savedDrinks,
        }
    }
    componentDidMount() {
        // this.handleKeyPress(null, 'Name');
        // this.setState({drinks: this.props.savedDrinks});
    }
    handleKeyPress = (event, filter) => {
        filter = this.attributeConv[filter];
        var newArr = [];
        let queryName = this.searchInputRef.current.value;
        if (queryName === '') {
            this.setState({drinks: this.props.savedDrinks});
        } else {
            for (var i = 0; i < this.props.savedDrinks.length; i++) {
                let drink = this.props.savedDrinks[i];
                let drinkAttr = drink[filter];
                let drinkFrag = drinkAttr.slice(0, queryName.length);
                if (drinkFrag.toLowerCase() === queryName.toLowerCase()) {
                    newArr.push(this.props.savedDrinks[i]);
                }
            }
            this.setState({drinks: newArr});
        }
    }
    render() {
        console.log(this.state.drinks);
        return (
        <div>
            <h6>These are drinks you haved liked!</h6>
            <SearchBar searchInputRef={this.searchInputRef} handleKeyPress={this.handleKeyPress}/>
            <br/>
            <DrinkList addShoppingItem={this.props.addShoppingItem} drinks={this.state.drinks} savedDrinks={this.props.savedDrinks}/>
        </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(MyDrinks);
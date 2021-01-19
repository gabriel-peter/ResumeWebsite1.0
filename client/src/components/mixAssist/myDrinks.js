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
        this.state = {}
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleKeyPress(e, filter) {
        this.setState({filter: this.attributeConv[filter]});
    }
    getFilteredDrinks() {
        var newArr = [];
        const filter = this.state.filter;
        let queryName = this.searchInputRef.current ? this.searchInputRef.current.value : '';
        if (queryName === '') {
            return this.props.savedDrinks;
        } else {
            for (var i = 0; i < this.props.savedDrinks.length; i++) {
                let drink = this.props.savedDrinks[i];
                let drinkAttr = drink[filter];
                let drinkFrag = drinkAttr.slice(0, queryName.length);
                if (drinkFrag.toLowerCase() === queryName.toLowerCase()) {
                    newArr.push(this.props.savedDrinks[i]);
                }
            }
            return newArr;
        }
    }
    render() {
        const drinks = this.getFilteredDrinks()
        return (
        <div>
            <h6>These are drinks you haved liked!</h6>
            <SearchBar searchInputRef={this.searchInputRef} handleKeyPress={this.handleKeyPress}/>
            <br/>
            <DrinkList addShoppingItem={this.props.addShoppingItem} drinks={drinks} savedDrinks={this.props.savedDrinks}/>
        </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(MyDrinks);
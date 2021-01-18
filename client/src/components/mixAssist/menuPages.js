import React, { Component } from 'react';
import DrinkForm from './drinkForm';
import { Tabs, Tab, Alert } from 'react-bootstrap';
import DrinkFinder from './drinkFinder';
import MyDrinks from './myDrinks';
import ShoppingList from './shoppingList';
import LoginHeader from './login/loginHeader';

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

class MenuPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOption: 'Test Bar',
            isSearching: false,
            // savedDrinks: [],
            shoppingItems: [],
        }
        this.addShoppingItem = this.addShoppingItem.bind(this);
        this.removeShoppingItem = this.removeShoppingItem.bind(this);
    }
    componentWillMount() {
        fetch('/api/saved-drinks')
        .then(res => res.json())
        .then(res => this.props.dumpDrinks(res));
    }
    
    addShoppingItem(item) {
        let arr = this.state.shoppingItems.slice(); //creates the clone of the state
        arr.push(item);
        this.setState({shoppingItems: arr});
        // this.setState(prev => ({shoppingItems: prev.shoppingItems.push(item)}));
    }
    removeShoppingItem(value) {
        let arr = this.state.shoppingItems.slice(); //creates the clone of the state
        arr = arr.filter(item => item !== value);
        this.setState({shoppingItems: arr});  
    }
    render() {
        console.log('Saved Drinks Loaded', this.state.savedDrinks);
        const myDrinksComponent = <MyDrinks addShoppingItem={this.addShoppingItem}/>;
        var pages = {
            'Make a Drink': <DrinkForm/>,
            'Discover': <DrinkFinder addShoppingItem={this.addShoppingItem}/>,
            'My Drinks': <MyDrinks/>,
            'Shopping List': <ShoppingList removeShoppingItem={this.removeShoppingItem} shoppingItems={this.state.shoppingItems}/>,
        }
        // TEST
        return(
            <div>
            <Alert variant='danger'>This Feature is Currently Under Maintenance!</Alert>
            <LoginHeader />
            <Tabs>
                {Object.keys(pages).map((page, index) => {
                    return (
                    <Tab key={index} eventKey={index} title={page}>
                        <br/>
                        {pages[page]}
                    </Tab>
                    );
                })}
            </Tabs>
            </div>
        );
    }
}
// https://www.youtube.com/watch?v=9d020AQCtcU
export default connect(mapStateToProps, mapDispatchToProps())(MenuPages);

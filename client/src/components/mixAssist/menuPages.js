import React, { Component } from 'react';
import ImageCarousel from './imageCarousel';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DrinkForm from './drinkForm';
import Nav from 'react-bootstrap/Nav';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import DrinkFinder from './drinkFinder';
import MyDrinks from './myDrinks';
import ShoppingList from './shoppingList';
import LoginHeader from './LoginHeader';

class MenuPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOption: 'Test Bar',
            isSearching: false,
            savedDrinks: [],
            shoppingItems: [],
        }
        this.addShoppingItem = this.addShoppingItem.bind(this);
        this.removeShoppingItem = this.removeShoppingItem.bind(this);
    }
    componentDidMount() {
        fetch('/saved-drinks')
        .then(res => res.json())
        .then(res => this.setState({savedDrinks: res}));
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
        var pages = {
            'Make a Drink': <DrinkForm/>,
            'Discover': <DrinkFinder addShoppingItem={this.addShoppingItem} savedDrinks={this.state.savedDrinks}/>,
            'My Drinks': <MyDrinks addShoppingItem={this.addShoppingItem} savedDrinks={this.state.savedDrinks} />,
            'Shopping List': <ShoppingList removeShoppingItem={this.removeShoppingItem} shoppingItems={this.state.shoppingItems}/>,
        }
        return(
            <div>
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

export default MenuPages;

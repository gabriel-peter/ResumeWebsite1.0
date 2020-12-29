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

class MenuPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOption: 'Test Bar',
            isSearching: false,
            savedDrinks: [],
        }
    }
    componentDidMount() {
        fetch('/saved-drinks')
        .then(res => res.json())
        .then(res => this.setState({savedDrinks: res}));
    }
    render() {
        console.log('Saved Drinks Loaded', this.state.savedDrinks);
        var pages = {
            'Make a Drink': <DrinkForm/>,
            'Discover': <DrinkFinder savedDrinks={this.state.savedDrinks}/>,
            'My Drinks': <MyDrinks savedDrinks={this.state.savedDrinks} />,
        }
        return(
            <Tabs>
                {Object.keys(pages).map((page, index) => {
                    return (
                    <Tab eventKey={index} title={page}>
                        <br/>
                        {pages[page]}
                    </Tab>
                    );
                })}
            </Tabs>
        );
    }
}

export default MenuPages;

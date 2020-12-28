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
        this.pages = {
            'Make a Drink': <DrinkForm/>,
            // 'default': <ImageCarousel/>,
            'Discover': <DrinkFinder/>,
            'My Drinks': <MyDrinks/>,
        }
        this.state = {
            menuOption: 'Test Bar',
            isSearching: false,
        }
        this.toggleForm = this.toggleForm.bind(this);
    }
    toggleForm() {
        this.setState(state => ({isMaking: !state.isMaking}));
    }
    render() {
        return(
            <Tabs>
                {Object.keys(this.pages).map((page, index) => {
                    return (<Tab eventKey={index} title={page}>{this.pages[page]}</Tab>);
                })}
            </Tabs>
        );
    }
}

export default MenuPages;

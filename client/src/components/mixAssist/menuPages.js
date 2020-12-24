import React, { Component } from 'react';
import ImageCarousel from './imageCarousel';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DrinkForm from './drinkForm';
import Nav from 'react-bootstrap/Nav';
import TestBar from './testBar';
import MyDrinks from './myDrinks';

class MenuPages extends Component {
    constructor(props) {
        super(props);
        this.pages = {
            'Make a Drink': <DrinkForm/>,
            // 'default': <ImageCarousel/>,
            'Test Bar': <TestBar/>,
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
    getPage() {
        if (this.state.menuOption) {
            return this.pages[this.state.menuOption];
        } else {
            return <ImageCarousel/>
        }
    }
    render() {
        let menuOption = this.getPage()
        return(
            <div>
                {/* <DropdownButton size='lg' id="dropdown-basic-button" title="MENU">
                    {Object.keys(this.pages).map((page, index) => {
                        return <Dropdown.Item key={index} onClick={() => this.setState({menuOption: page})} as="button"> {page} </Dropdown.Item>
                    })
                    }
                </DropdownButton> */}
                <Nav variant="tabs">
                    {Object.keys(this.pages).map((page, index) => {
                            return (
                                <Nav.Item>
                                    <Nav.Link 
                                        key={index} 
                                        onClick={() => this.setState({menuOption: page})}>
                                            {page}
                                    </Nav.Link>
                                </Nav.Item>
                            );
                        })}
                </Nav>
                {menuOption}
            </div>
        );
    }
}

export default MenuPages;

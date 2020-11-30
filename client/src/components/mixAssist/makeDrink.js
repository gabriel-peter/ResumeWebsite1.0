import React, { Component } from 'react';
import ImageCarousel from './imageCarousel';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DrinkForm from './drinkForm'

class MakeDrink extends Component {
    constructor() {
        super();
        this.state = {
            isMaking: false,
        }
        this.toggleForm = this.toggleForm.bind(this);
    }
    toggleForm() {
        this.setState(state => ({isMaking: !state.isMaking}));
    }
    render() {
        return(
            <div>
            {this.state.isMaking ?
            <DrinkForm toggleForm={this.toggleForm}/>
            :
            <div>
            <Dropdown navbar='true' onSelect={(a, e) => console.log(a, e)}>
                <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                <Dropdown.Item onClick={this.toggleForm} as="button">Submit a New Drink!</Dropdown.Item>
                <Dropdown.Item as="button">My Drinks</Dropdown.Item>
                <Dropdown.Item as="button">Test Bar</Dropdown.Item>
                </DropdownButton>
            </Dropdown>
            <ImageCarousel/>
            </div>
            }
            </div>
        );
    }
}

export default MakeDrink;
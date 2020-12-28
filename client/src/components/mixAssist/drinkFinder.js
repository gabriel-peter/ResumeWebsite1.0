import React, { Component } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

import '../../App.css'
import DrinkList from './drinkList/drinkList';
class DrinkFinder extends Component {
    constructor(){
        super();
        this.state = {
            drinks: []
        }
    }
    render() {
        return(
        <div>
            <br/>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
              </InputGroup.Prepend>
              <FormControl aria-label="Text input with checkbox" />
            </InputGroup>
            <DrinkList drinks={this.state.drinks}/>
        </div>);
    }
}

export default DrinkFinder;
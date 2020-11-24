import React, { Component } from 'react';
import ImageCarousel from './imageCarousel';
import Button from 'react-bootstrap/Button';
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
            <div>
            <Button onClick={this.toggleForm} variant="primary" size="lg">
                Submit a New Drink!
            </Button>
            <ImageCarousel/>
            </div>
            : 
            <DrinkForm toggleForm={this.toggleForm}/>}
            </div>
        );
    }
}

export default MakeDrink;
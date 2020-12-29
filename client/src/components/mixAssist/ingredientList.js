import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DrinkCalculator from './drinkCalculator';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';

class IngredientList extends Component {
    constructor(props) {
        super(props);
        // this.ingredients = {}
        this.units = ['ml', 'oz', 'grams', 'ct'];
        this.state = {
            ingredients: {}
        }
    }
    updateIngredientList(event) {
        // this.ingredients[event.target.id] = event.target.value;
        // console.log(this.ingredients);
        var ingredients = {...this.state.ingredients};
        ingredients[event.target.id] = event.target.value;
        this.setState({ingredients});
    }
    updateUnit(value, event) {
        // console.log(value, event.target.id);
        let index = event.target.id.split('-')[0];
        var ingredients = {...this.state.ingredients};
        ingredients[index] = value;
        this.setState({ingredients});
        console.log(this.state.ingredients)
    }
    render() {
        let ingredientList = [];
        for (var i = 1; i <= this.props.ingredientCount; i++) {
            var ingredients = {...this.state.ingredients};
            //  Set default values to state attributes if they were not populated already.
            ingredients['ingredient'+i] = ingredients['ingredient'+i] || '';
            ingredients['measurement'+i] = ingredients['measurement'+i] || '0';
            ingredients['unit'+i] = ingredients['unit'+i] || 'ml';
            this.state.ingredients = ingredients;
            ingredientList.push(
                <div key={i}>
                    
                    <InputGroup 
                        onChange={(event) => this.updateIngredientList(event)} 
                        key={i}
                        // variant='flush'
                    >
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">{i}</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            id={'indgredient'+i}
                            placeholder="Untitled Item"
                            aria-label=""
                            aria-describedby="basic-addon1"
                            // variant='flush'
                        />
                        <FormControl
                            id={'measurement'+i}
                            placeholder="Measurement"
                            aria-label=""
                            aria-describedby="basic-addon1"
                            // variant='flush'
                        />
                        <DropdownButton 
                            as={InputGroup.Append}
                            variant="outline-secondary"
                            id={'unit'+i}
                            title={this.state.ingredients['unit'+i]}
                            onSelect={(value, event) => this.updateUnit(value, event)}
                        >
                            {this.units.map((item) => {
                                return (<Dropdown.Item 
                                            eventKey={item}
                                            id={'unit'+i+'-'+item}
                                            key={'unit'+i+'-'+item}
                                        >
                                            {item}
                                        </Dropdown.Item>);
                            })} 
                        </DropdownButton>     
                    </InputGroup>
                    <br/>
                </div>
            )
        }
        return (
        <div>
            {ingredientList}
        </div>);
    }
}

export default IngredientList;

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DrinkCalculator from './drinkCalculator';

class TestBar extends Component {
    constructor() {
        super();
        // this.ingredients = {}
        this.units = ['ml', 'oz', 'g', 'ct'];
        this.state = {
            ingredientCount: 3,
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
        console.log(value, event.target.id);
        let index = event.target.id.split('-')[0];
        var ingredients = {...this.state.ingredients};
        ingredients[index] = value;
        this.setState({ingredients});
        console.log(this.state.ingredients)
    }
    render() {
        let ingredientList = [];
        for (var i = 1; i <= this.state.ingredientCount; i++) {
            var ingredients = {...this.state.ingredients};
            //  Set default values to state attributes if they were not populated already.
            ingredients['ingredient'+i] = ingredients['ingredient'+i] || '';
            ingredients['measurement'+i] = ingredients['measurement'+i] || '0';
            ingredients['unit'+i] = ingredients['unit'+i] || 'ml';
            this.state.ingredients = ingredients;
            ingredientList.push(
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <InputGroup onChange={(event) => this.updateIngredientList(event)} key={i} className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">{i}</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id={'indgredient'+i}
                                    placeholder="Untitled Item"
                                    aria-label=""
                                    aria-describedby="basic-addon1"
                                />
                                <FormControl
                                    id={'measurement'+i}
                                    placeholder="Measurement"
                                    aria-label=""
                                    aria-describedby="basic-addon1"
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
                                                    // unitKey={i}
                                                >
                                                        {item}
                                                </Dropdown.Item>);
                                    })} 
                                </DropdownButton>     
                            </InputGroup>
                        </div>
                        {/* <div className="col-lg-6">
                            <InputGroup key={-1*i} className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">{i}</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                placeholder="Untitled Item"
                                aria-label=""
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div> */}
                    </div>
                </div>
            )
        }
        return (
        <div>
            <h1>TEST BAR</h1>
            <h3>Name</h3>
            <h3>Ingredients</h3>
            {ingredientList}
            <DrinkCalculator ingredients={this.state.ingredients}/>
            <div>
            <Button variant='outline-primary' onClick={() => this.setState(prevState => ({ingredientCount: prevState.ingredientCount + 1}))}>(+) Add new item</Button>
            <Button variant='outline-warning' onClick={() => this.setState(prevState => ({ingredientCount: prevState.ingredientCount - 1}))}>(-) Remove last item</Button>
            </div>
            <br/>
            <Button variant='secondary'>Continue</Button>
        </div>);
    }
}

export default TestBar;
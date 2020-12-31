import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DrinkCalculator from '../drinkCalculator';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

class FocusDrink extends Component {
    constructor(props) {
        super(props);
        this.units = ['ml', 'oz', 'grams', 'ct'];
        var isLiked = false;
        for (var i = 0; i < this.props.savedDrinks.length; i++) {
            if (this.props.savedDrinks[i].d_name == this.props.drink.d_name) {
                isLiked = true;
                break;
            }
        }
        this.state = {
            unit: this.units[0],
            liked: isLiked,
            toBuyItems: this.parseIngredients(this.props.drink.d_ingredients).map(item => item[0]),
            ingredients: this.parseIngredients(this.props.drink.d_ingredients),
        }
        this.handleLike = this.handleLike.bind(this);
    }
    parseIngredients(s) {
        let ingredients = s.trim().split('|')
        console.log(ingredients);
        ingredients = ingredients.filter(e => {
            return e !== null && e !== ',' && e !== '';
        })
        return ingredients.map(ingredient => {
            let arr = ingredient.split(',');
            // arr.splice(1, 0, "~");
            return arr;
        });
    }
    addToShoppingList(value) {
        var arr = this.state.toBuyItems;
        arr = arr.filter(item => item !== value);
        this.setState({toBuyItems: arr});
        console.log('Added to list', this.state.toBuyItems, value)
        this.props.addShoppingItem(value);
    }
    handleLike() {
        this.setState(prev => ({liked: !prev.liked}));
        if (!this.state.liked) {
            // addDrink
            fetch('/addDrink/'+this.props.drink.d_name);
            // Local which updates state rendering
            this.props.savedDrinks.push(this.props.drink);
        } else {
            // removeDrink
            fetch('/removeDrink/'+this.props.drink.d_name);
            // TODO
            // this.props.savedDrinks.remove(this.props.drink);
        }
    }
    render() {
        // var ingredients = 
        // var toBuyItem = ingredients.slice();
        return (
            <div>
                <Container fluid>
                {/* <Accordion defaultActiveKey='1'> */}
                <Row>
                <Col xs={12} md={4}>
                
                <Card border='primary'>
                    {/* TODO 'You can use a custom element type for this component.' ... as={Figure} */}
                    <Card.Header>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                        <ButtonGroup className="mr-1">
                            <Button 
                                variant='outline-primary' 
                                onClick={() => this.props.focusDrink(null)}>
                                    Back
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup toggle className="mr-1">
                            <ToggleButton
                                type="checkbox"
                                variant="outline-primary"
                                checked={this.state.liked}
                                value="1"
                                onChange={this.handleLike}
                            >
                                {/* TODO MAKE THIS A HEART.PNG */}
                                {this.state.liked ? 'Unlike':'Like'}
                            </ToggleButton>
                        </ButtonGroup>
                        <ButtonGroup className="mr-1">
                            <Accordion.Toggle as={Button} eventKey="0">Show Image</Accordion.Toggle>
                        </ButtonGroup>
                        </ButtonToolbar>         
                    </Card.Header>
                    <Card.Body>
                        <Card.Title as='h1'>
                            {this.props.drink.d_name}
                        </Card.Title>
                        <Card.Title>{this.props.drink.d_cat}</Card.Title>
                        <Card.Text>{this.props.drink.d_instructions}</Card.Text>   
                    </Card.Body>
                    <Card.Header as='h5'>
                        <Row>
                            <Col>
                                Ingredients ({this.state.ingredients.length})
                            </Col>
                            <Col sm={2}>
                                {/* <DropdownButton
                                    id={'dropdown-unit-changer'}
                                    variant='outline-secondary'
                                    title={this.state.unit}
                                >
                                    {this.units.map((unit, index) => {
                                        return(<Dropdown.Item 
                                                    key={index} 
                                                    eventKey={unit}
                                                >
                                                    {unit}
                                                </Dropdown.Item>);
                                    })}
                                </DropdownButton> */}
                            </Col>
                        </Row>
                    </Card.Header>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Measurement</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.ingredients.map((ingredient, index) => {
                            return(<tr>
                            <td>{index+1}</td>
                            <td>{ingredient[0]}</td>
                            <td>{ingredient[1]}</td>
                            </tr>);
                        })}  
                        </tbody>
                    </Table>
                </Card>
                
                </Col>
                <Col xs={12} md={4}>
                    <Card border='primary'>
                        <Card.Img variant='bottom' src={this.props.drink.d_img_url} roundedCircle/>
                        <Card.Body>
                            <h5>Recommended Purchases:</h5>
                            {this.state.toBuyItems.map((item, index) => {
                                return(<div>
                                    <Row>
                                        <Col xs={5}>
                                        {item}
                                        </Col>
                                        <Col xs={4}>
                                        <Button variant="link" onClick={() => this.addToShoppingList(item)}> Remember</Button>
                                        </Col>
                                        <Col xs={3}>
                                        <Button variant="link"> Buy</Button>
                                        </Col>
                                    </Row>
                                </div>);
                            })}
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <DrinkCalculator ingredients={this.state.ingredients}/>
                </Col>
                </Row>
                {/* </Accordion> */}
                </Container>
            </div>);
    }
}

export default FocusDrink;

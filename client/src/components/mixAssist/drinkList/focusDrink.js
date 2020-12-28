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
import DrinkCalculator from '../drinkCalculator';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

class FocusDrink extends Component {
    constructor(props) {
        super(props);
        this.units = ['ml', 'oz', 'grams', 'ct'];
        this.state = {
            unit: this.units[0],
            // TODO make this update from cookie?
            liked: false,
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
    handleLike() {
        this.setState(prev => ({liked: !prev.liked}));
        if (!this.state.liked) {
            // addDrink
            fetch('/addDrink/'+this.props.drink.d_name);
        } else {
            // removeDrink
            fetch('/removeDrink/'+this.props.drink.d_name);
        }
    }
    render() {
        let ingredients = this.parseIngredients(this.props.drink.d_ingredients);
        return (
            <div>
                <Container fluid>
                <Row>
                <Col xs={12} md={6}>
                <Accordion>
                <Card border='primary'>
                    {/* TODO 'You can use a custom element type for this component.' ... as={Figure} */}
                    <Card.Header>
                        <Row>
                            <Col>
                                <Button 
                                    variant='outline-primary' 
                                    onClick={() => this.props.focusDrink(null)}>
                                        Back
                                </Button>
                            </Col>
                            {/* <Col lg={4}>
                                <Accordion.Toggle as={Button} eventKey="0">Show Image</Accordion.Toggle>
                            </Col> */}
                        </Row>
                    </Card.Header>
                    {/* <Accordion.Collapse eventKey="0">
                    <Card.Img variant='bottom' src={this.props.drink.d_img_url} roundedCircle/>
                    </Accordion.Collapse> */}
                    <Card.Body>
                        <Card.Title as='h1'>
                            <Row>
                                <Col>
                                    {this.props.drink.d_name}
                                </Col>
                                <Col sm={2}>
                                    <ButtonGroup toggle className="mb-2">
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
                                </Col>
                            </Row>
                        </Card.Title>
                        <Card.Title>{this.props.drink.d_cat}</Card.Title>
                        <Card.Text>{this.props.drink.d_instructions}</Card.Text>   
                    </Card.Body>
                    <Card.Header as='h5'>
                        <Row>
                            <Col>
                                Ingredients ({ingredients.length})
                            </Col>
                            <Col sm={2}>
                                <DropdownButton
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
                                    
                                </DropdownButton>
                            </Col>
                        </Row>
                    </Card.Header>
                    {/* <ListGroup className="list-group-flush">
                        {ingredients.map((ingredient, index) =>
                            <ListGroupItem key={index}>
                                <Row>
                                    <Col>{ingredient[0]}</Col> 
                                    <Col>{ingredient[1]}</Col>
                                </Row>       
                            </ListGroupItem>
                        )}
                    </ListGroup> */}
                    <Table striped bordered hover>
                        {/* <thead>
                            <tr>
                            <th></th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            </tr>
                        </thead> */}
                        <tbody>
                        {ingredients.map((ingredient, index) => {
                            return(<tr>
                            <td>{index+1}</td>
                            <td>{ingredient[0]}</td>
                            <td>{ingredient[1]}</td>
                            </tr>);
                        })}  
                        </tbody>
                        </Table>
                    <Card.Body>
                        <DrinkCalculator ingredients={ingredients}/>
                    </Card.Body>
                </Card>
                </Accordion>
                    </Col>
                    <Col xs={12} md={6}>
                        <Card border='primary'>
                            <Card.Img variant='bottom' src={this.props.drink.d_img_url} roundedCircle/>
                        </Card>
                        <Card.Body>
                            Recommended Purchases: API here...
                        </Card.Body>
                    </Col>
                </Row>
                </Container>
            </div>);
    }
}

export default FocusDrink;

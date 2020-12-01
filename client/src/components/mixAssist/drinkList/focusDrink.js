import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class FocusDrink extends Component {
    constructor(props) {
        super(props);
        this.units = ['ml', 'oz', 'grams', 'ct'];
        this.state = {
            unit: this.units[0],
            liked: false,
        }
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
    render() {
        let ingredients = this.parseIngredients(this.props.drink.d_ingredients);
        return (
            <div> 
                <Card border='primary'>
                    {/* TODO 'You can use a custom element type for this component.' ... as={Figure} */}
                    <Card.Img variant='bottom' src={this.props.drink.d_img_url} />
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
                                            onChange={() => this.setState(prev => ({liked: !prev.liked}))}
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
                                        return(<Dropdown.Item eventKey={unit}>{unit}</Dropdown.Item>);
                                    })}
                                    
                                </DropdownButton>
                            </Col>
                        </Row>
                    </Card.Header>
                    <ListGroup className="list-group-flush">
                        {ingredients.map((ingredient, index) =>
                            // <ListGroup horizontal>
                            //     <ListGroupItem key={index}>{ingredient[0]}</ListGroupItem>
                            //     <ListGroupItem key={index+'.1'}>{ingredient[1]}</ListGroupItem>
                            // </ListGroup>
                            <ListGroupItem key={index}>
                                <Row>
                                    <Col>{ingredient[0]}</Col> 
                                    <Col>{ingredient[1]}</Col>
                                </Row>       
                            </ListGroupItem>
                        )}
                    </ListGroup>
                    <Card.Body>
                        <p>Recommended Serving Glass: <strong>{this.props.drink.d_glass}</strong></p>
                        <Button variant='outline-primary' onClick={this.props.focusDrink}>Back</Button>
                    </Card.Body>
                </Card>
            </div>);
    }
}

export default FocusDrink;

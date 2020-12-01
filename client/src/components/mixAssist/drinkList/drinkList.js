import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import FocusDrink from './focusDrink';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Highlight } from 'react-vis';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/esm/Card';

class DrinkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drinks: this.props.drinks,
            focusedDrink: null,
        }
        this.focusDrink = this.focusDrink.bind(this)
    }
    focusDrink(index) {
        this.setState({focusedDrink: this.props.drinks[index]});
    }
    render() {
        console.log(this.state.focusedDrink);
        return(
        <div>
            {this.state.focusedDrink ?
                <FocusDrink 
                    drink={this.state.focusedDrink}
                    focusDrink={this.focusDrink}
                />
                :
                <div>
                {this.props.drinks.length > 0 ?
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col><strong>Name</strong></Col>
                                <Col sm={3}><strong>Popularity</strong></Col>
                            </Row>
                        </Card.Header>
                        <ListGroup variant='flush'>
                            {this.props.drinks.map((drink, index) => 
                                <ListGroup.Item 
                                    onClick={() => this.focusDrink(index)} 
                                    key={index}
                                >   
                                    <Row>
                                        <Col>{drink.d_name}</Col>
                                        <Col sm={2}>{Math.floor((Math.random() * 10) + 1)}</Col>
                                    </Row>
                                    
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                    :
                    <Jumbotron>
                        <Row>
                            <Col>
                            <h6 className='center'>Unable to find any drinks that match your search.</h6>
                            </Col>
                        </Row>
                    </Jumbotron>
                }
                </div>
            } 
        </div>);
    }
}

export default DrinkList;

import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
        <div>
            {this.props.shoppingItems.length > 0 ?
            <Card>
                {/* <Card.Header>Test</Card.Header> */}
                <ListGroup variant='flush'>
                    {this.props.shoppingItems.map(item => {
                        return(
                            <ListGroup.Item>       
                                <ButtonToolbar
                                    className="justify-content-between"
                                    aria-label="Toolbar with Button groups"
                                >
                                    <h6>{item}</h6>
                                    <ButtonGroup aria-label="First group">
                                        <Button 
                                            variant='outline-success'
                                            onClick={() => this.props.removeShoppingItem(item)}
                                        >
                                            Remove
                                        </Button>
                                    </ButtonGroup>
                                </ButtonToolbar>
                            </ListGroup.Item>);
                        }
                    )}
                </ListGroup>
            </Card>
            :
            <Jumbotron>
                        <Row>
                            <Col>
                            <h6 className='center'>There is nothing in your shopping list.</h6>
                            </Col>
                        </Row>
                    </Jumbotron>
            }
        </div>);
    }
}

export default ShoppingList;
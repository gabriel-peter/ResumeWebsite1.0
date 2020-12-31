import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import FocusDrink from './focusDrink';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Highlight } from 'react-vis';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

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
        console.log(index);
        this.setState({focusedDrink: this.props.drinks[index]});
    }
    render() {
        console.log(this.state.focusedDrink);
        return(
        <div>
            {this.state.focusedDrink ?
                <FocusDrink
                    savedDrinks={this.props.savedDrinks}
                    drink={this.state.focusedDrink}
                    focusDrink={this.focusDrink}
                    addShoppingItem={this.props.addShoppingItem}
                />
                :
                <div>
                {this.props.drinks.length > 0 ?
                    <div>
                    <p>Results: {this.props.drinks.length} of {761}</p>
                        <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            {/* <th>#</th> */}
                            <th>Drink Name</th>
                            <th>Category</th>
                            <th>Alcoholic</th>
                            <th>Popularity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.drinks.map((drink, index) => {
                                var checked = "\u2715";
                                if (drink.d_alcohol === 'Alcoholic') {
                                    checked = "\u2713";
                                }
                                return(
                                <tr key={index} onClick={() => this.focusDrink(index)}>
                                {/* <td>{index+1}</td> */}
                                <td>{drink.d_name}</td>
                                <td>{drink.d_cat}</td>
                                <td>{checked}</td>
                                <td>{Math.floor((Math.random() * 10) + 1)}</td>
                                </tr>
                                );
                            })}
                        </tbody>
                        </Table>
                        </div>
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

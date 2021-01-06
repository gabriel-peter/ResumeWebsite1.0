import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup'
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import RangeSlider from './rangeSlider';

// import '../../App.css'
class PlaylistGenerator extends Component {
    constructor(){
        super();
        // const [ value, setValue ] = React.useState(50);
        // this.value = value;
        // this.setValue = setValue;
        this.searchInputRef = React.createRef();
        this.state = {
            seed: [],
            results: {
                tracks: {
                    items: [],
                },
                artists: {
                    items: [],
                },
                albums: {
                    items: [],
                }
            },
        }
    }
    handleKeyPress(event) {
        let queryName = '?q=\"' + this.searchInputRef.current.value + '\"&type=track&limit=5';
        queryName.replace(' ', '%20');
        console.log(queryName);
        this.setState({results: null})
        fetch('https://api.spotify.com/v1/search' + queryName, {
            headers: {"Authorization": "Bearer " + this.props.access_token}
            })
            .then(res => res.json()).then(res => {
                console.log(res);
                this.setState({results: res});
            });
            // .then(res => this.setState({}));
    }
    addToSeed(item) {
        let oldSeed = this.state.seed;
        oldSeed.push(item);
        this.setState({seed: oldSeed});
    }
    render() {
        let tracks = [];
        if (this.state.results !== null) {
            tracks = this.state.results.tracks.items;
        }
        return(
        <Card style={{ width: '350px'}}>
            <Card.Body>
                <Card.Title>Playlist Generator <Badge variant="warning">Coming Soon!</Badge></Card.Title>
                <Card.Text>{this.state.seed.map(item => {
                    return(<Button variant='outline-success'>{item.name}</Button>);}
                )}</Card.Text>
                <InputGroup onChange={(event) => this.handleKeyPress(event)}>
                    <FormControl
                        ref = {this.searchInputRef}
                        placeholder="Search for song seed!"
                        // aria-label="Recipient's username"
                        // aria-describedby="basic-addon2"
                    />
                </InputGroup>
                {this.state.results === null ?
                    <div>
                        <br/>  
                        <Spinner variant="primary" size='lg' animation="border"/>
                        Loading ... 
                    </div>
                :
                <ListGroup variant='flush'>
                {tracks.map((item, index) => {
                    return(
                        <ListGroup.Item 
                            key={index}
                            onClick={() => this.addToSeed(item)}
                            // onMouseEnter={() => this.focusSong(index)}
                            // onMouseLeave={() => this.focusSong(index)}
                            >     
                            {item.name}
                            <div><b>{item.artists.length > 1 ? 
                                    item.artists[0].name + ', ' + item.artists[1].name + ' ...' 
                                :   item.artists[0].name}</b></div>
                        </ListGroup.Item>);
                })}
                </ListGroup>
                }
                {/* <Form>
                    <Form.Group>
                        <Form.Label>
                        My Label
                        </Form.Label>
                        <RangeSlider
                            size='lg'
                            value={this.value}
                            onChange={e => this.setValue(e.target.value)}
                        />
                    </Form.Group>
                </Form> */}
                {this.state.seed.length > 0 &&
                <Button block disabled>Create</Button>}
            </Card.Body>
        </Card>);
    }
}

export default PlaylistGenerator;
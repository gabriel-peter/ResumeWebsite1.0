import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <InputGroup onKeyPress={this.props.handleKeyPress}>
                <FormControl
                placeholder="Search for a drink!"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                />

                <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                title="Filter"
                id="input-group-dropdown-2"
                >
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Item href="#">Something else here</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">Separated link</Dropdown.Item>
                </DropdownButton>
            </InputGroup>);
    }
}

export default SearchBar;
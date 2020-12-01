import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.filters = [
            'Name', 
            'Is Alcoholic',
            'Category',
            'Creator',
            'Contains',
            'Popularity']
        this.state = {
            filter: this.filters[0]
        }
    }
    render() {
        return (
            <InputGroup onChange={(event) => this.props.handleKeyPress(event, this.state.filter)}>
                <FormControl
                ref = {this.props.searchInputRef}
                placeholder="Search for a drink!"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                />

                <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                title={'Filter: '+ this.state.filter}
                id="input-group-dropdown-2"
                onSelect={(filter) => this.setState({filter: filter})}
                >
                {this.filters.map((filter, index) => {
                    return (<Dropdown.Item key={index} eventKey={filter}>{filter}</Dropdown.Item>)
                })}
                </DropdownButton>
            </InputGroup>);
    }
}

export default SearchBar;
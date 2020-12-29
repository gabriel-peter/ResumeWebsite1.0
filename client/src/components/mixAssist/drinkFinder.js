import React, { Component } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchBar from './search';

import '../../App.css'
import DrinkList from './drinkList/drinkList';
class DrinkFinder extends Component {
    constructor(props) {
        super(props);
        this.attributeConv = {
            'Name': 'd_name',
            'Is Alcoholic': 'd_alcohol',
            'Category': 'd_cat',
            'Creator': 'd_glass',
            'Contains': 'd_ingredients',
        }
        this.searchInputRef = React.createRef();
        this.state = {
            drinks: [],
            resultLimit: 0,
        }
    }
    handleKeyPress = (event, filter) => {
        // if(event.key === 'Enter'){
            let queryName = this.searchInputRef.current.value
            if (queryName === '') {
                fetch('/api/all-drinks' + queryName)
                .then(res => res.json())
                .then(res => this.setState({drinks: res, resultLimit: res.length})); 
            } else {
                if (filter==='Contains') {
                    // TODO
                    queryName = queryName.replace(' ', '').split(',');
                }
                fetch('/api/search/'+this.attributeConv[filter]+'/'+ queryName)
                .then(res => res.json())
                .then(res => this.setState({drinks: res, resultLimit: res.length}));
            }
        // }
    }
    componentDidMount() {
        this.handleKeyPress();
        // fetch('/api/all-drinks')
        // .then(res => res.json())
        // .then(res => this.setState({drinks: res}));
    }
    updateList(data) {
        this.setState({drinks: data})
    }
    render() {

        return(
        <div>
            <SearchBar searchInputRef={this.searchInputRef} handleKeyPress={this.handleKeyPress}/>
            {console.log('REF', this.searchInputRef.current)}
            <DrinkList savedDrinks={this.props.savedDrinks} drinks={this.state.drinks}/>
        </div>);
    }
}

export default DrinkFinder;
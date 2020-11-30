import React, { Component } from 'react';
import SearchBar from './search'
import DrinkList from './drinkList/drinkList'

class SearchDrink extends Component {
    constructor() {
        super();
        this.searchInputRef = React.createRef();
        this.state = {
            drinks: []
        }
    }
    handleKeyPress = (event) => {
        // if(event.key === 'Enter'){
            const queryName = this.searchInputRef.current.value
            if (queryName === '') {
                fetch('/api/all-drinks' + queryName)
                .then(res => res.json())
                .then(res => this.setState({drinks: res})); 
            } else {
                console.log('enter press here! '+ queryName)
                // make query to DB
                fetch('/api/search/' + queryName)
                .then(res => res.json())
                .then(res => this.setState({drinks: res}));
            }
        // }
    }
    componentDidMount() {
        fetch('/api/all-drinks')
        .then(res => res.json())
        .then(res => this.setState({drinks: res}));
    }
    updateList(data) {
        this.setState({drinks: data})
    }
    render() {
        return(
        <div>
            <SearchBar searchInputRef={this.searchInputRef} handleKeyPress={this.handleKeyPress}/>
            <br/>
            <DrinkList drinks={this.state.drinks}/>
        </div>);
    }
}

export default SearchDrink;
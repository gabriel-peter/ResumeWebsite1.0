import React, { Component } from 'react';
import SearchBar from './search';
import DrinkList from './drinkList/drinkList';
import MenuPages from './menuPages';

class MixAssist extends Component {
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
            const queryName = this.searchInputRef.current.value
            if (queryName === '') {
                fetch('/api/all-drinks' + queryName)
                .then(res => res.json())
                .then(res => this.setState({drinks: res, resultLimit: res.length})); 
            } else {
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
        let isSearching = false;
        if (this.searchInputRef.current != null) {
            if (this.searchInputRef.current.value != '') {
                isSearching = true;
            }
        }
        return(
        <div>
            <SearchBar searchInputRef={this.searchInputRef} handleKeyPress={this.handleKeyPress}/>
            {console.log('REF', this.searchInputRef.current)}
            <br/>
            {isSearching ? 
                <DrinkList drinks={this.state.drinks}/>
                :
                <MenuPages/>
            }
        </div>);
    }
}

export default MixAssist;
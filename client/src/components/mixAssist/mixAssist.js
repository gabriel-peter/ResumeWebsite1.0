import React, { Component } from 'react';
import MixAssistMain from './menuPages';
import SearchDrink from './searchDrink';

class MixAssist extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    render() {
        return(
            <div>
                <h1>Introducing MixAssist</h1>
                <div>BETA</div>
                <br />
                <SearchDrink/>
            </div>
        )
    }
}

export default MixAssist;
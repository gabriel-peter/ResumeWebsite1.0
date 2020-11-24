import React, { Component } from 'react';
import MakeDrink from './makeDrink';
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
            
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <MakeDrink/>
                    </div>
                    <div className="col-lg-6">
                        <SearchDrink/>
                    </div>
                </div>
                </div>
                <div>
                </div> 
            </div>
        )
    }
}

export default MixAssist;
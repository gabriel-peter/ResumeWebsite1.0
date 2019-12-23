import React, {Component} from 'react';

class Artists_Preview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            artist: props.artist
        }
    }
    render() {
        return (
        <div>
            <img src={this.state.artist.images[0].url} alt={''} height={100} width={100}/>
            {this.state.artist.highlight ? (<strong>jiji</strong>):(<p>{this.state.artist.name}</p>)} 
        </div>);
    }
}

export default Artists_Preview;
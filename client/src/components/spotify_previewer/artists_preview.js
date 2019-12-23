import React, {Component} from 'react';

class Artists_Preview extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props.artist)
        return (
        <div>
            <img src={this.props.artist.images[0].url} alt={''} height={100} width={100}/>
            <p>{this.props.artist.name}</p>
        </div>);
    }
}

export default Artists_Preview;
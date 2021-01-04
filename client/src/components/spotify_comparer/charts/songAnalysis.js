import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';
import '../graph_styling.css';
import SoundEvaluation from './soundEvaluation';
// http://uber.github.io/react-vis/documentation

const itemsPerPage = 5;
class SongAnalysis extends Component {
    constructor(props) {
      super(props)
      this.state= {
          pageFocus: 1,
          songFocus: null,
      }
      this.focusSong = this.focusSong.bind(this);
    }
    focusSong(index) {
        if (index !== null) {
            index = index + (this.state.pageFocus - 1) * itemsPerPage;
        }
        console.log(index);
        this.setState({songFocus: this.props.topTracks.items[index]});
    }
    handlePrev() {
        const numberOfPages = this.props.topTracks.items.length / itemsPerPage;
        if(this.state.pageFocus === 1) {
            this.setState({pageFocus: numberOfPages});
        } else {
            this.setState(prev => ({pageFocus: prev.pageFocus-1}));
        }
    }
    handleNext() {
        console.log(this.props.topTracks);
        const numberOfPages = this.props.topTracks.items.length / itemsPerPage;
        if(this.state.pageFocus === numberOfPages) {
            this.setState({pageFocus: 1});
        } else {
            this.setState(prev => ({pageFocus: prev.pageFocus+1}));
        }
    }
    render(){
        // console.log(this.props.topTracks);
        const numberOfPages = this.props.topTracks.items.length / itemsPerPage;
        var pageTabs = [
            <Pagination.Prev onClick={() => this.handlePrev()} />,
            <Pagination.Next onClick={() => this.handleNext()}/>
        ];
        // for (let number = 1; number <= numberOfPages; number++) {
        //     pageTabs.push(
        //       <Pagination.Item 
        //         key={number} 
        //         active={number === this.state.pageFocus}
        //         onClick={() => this.setState({pageFocus: number})}>
        //         {number}
        //       </Pagination.Item>,
        //     );
        //   }
        let tracks = this.props.topTracks.items.slice();
        const lowerLimit = (this.state.pageFocus - 1) * itemsPerPage ;
        const upperLimit = this.state.pageFocus * itemsPerPage;
        tracks = tracks.slice(lowerLimit, upperLimit);
      return(
      <Card style={{width: '350px'}}>
        <Card.Body>
            {this.state.songFocus ?
                <SoundEvaluation 
                    song={this.state.songFocus}
                    focusSong={this.focusSong}
                    access_token={this.props.access_token}
                />
            :
            <div>
                <Card.Title>Top Songs</Card.Title>
                <ListGroup variant='flush'>
                {tracks.map((item, index) => {
                    return(
                        <ListGroup.Item 
                            key={index}
                            onClick={() => this.focusSong(index)}>     
                            {item.name}
                            <br/>
                            {item.artists.map((artist, index) => {
                                if (index === item.artists.length - 1) {
                                    return(<strong>{artist.name}</strong>);
                                } else {
                                    return(<strong>{artist.name}, </strong>);
                                }})}
                        </ListGroup.Item>);
                })}
                </ListGroup>
                <i>{lowerLimit+1} - {upperLimit+1} of {this.props.topTracks.items.length} songs</i>
                <Pagination size='lg'>{pageTabs}</Pagination>
            </div>
            }
        </Card.Body>
      </Card>);
    }
}

export default SongAnalysis;
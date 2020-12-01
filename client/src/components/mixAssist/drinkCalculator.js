





import React, { Component } from 'react';
class DrinkCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    getTotalVolume() {
        let volume = 0;
        for (let key in this.props.ingredients) {
            if (key.includes('measurement')) {
                let v = this.props.ingredients[key];
                volume += Number(v);
            }
        }
        return volume;
    }
    getTotalCalories() {
        let calories = 0;
        // for (let key in this.props.ingredients) {
        //     if (key.includes('measurement')) {
        //         let v = this.props.ingredients[key];
        //         volume += Number(v);
        //     }
        // }
        return calories;
    }
    getAlcoholContent(volume) {
        let volumeAlc = 0;
        // for (let key in this.props.ingredients) {
        //     if (key.includes('measurement')) {
        //         let v = this.props.ingredients[key];
        //         volume += Number(v);
        //     }
        // }
        if (volume == 0) {
            return 0;
        }
        return volumeAlc/volume;
    }
    getGlass(volume) {
        if (volume <= 30) {
            return 'Shot Glass';
        } else {
            return 'Collins Glass';
        }
    }
    render() {
        let totalVolume = this.getTotalVolume();
        let alcoholContent = this.getAlcoholContent(totalVolume);
        let recommendedGlass = this.getGlass(totalVolume);
        let totalCalories = this.getTotalCalories();
        return(
        <div>
            <p>Alcohol Content: {alcoholContent}% | {alcoholContent*2} Proof</p>
            <p>Calories: {totalCalories} kCal</p>
            <p>Total Volume: {totalVolume}</p>
            <p>Recommeded Glassware: <strong>{recommendedGlass}</strong></p>
            {/* TODO Put scale slider here! */}
            <p>Acidity Rating</p>
        </div>);
    }
}

export default DrinkCalculator;

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';

class FocusDrink extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    parseIngredients(s) {
        const ingredients = s.trim().split('|')
        ingredients.pop();
        return ingredients.map(ingredient => {
            let arr = ingredient.split(',');
            arr.splice(1, 0, "~");
            return arr.join('\t');
        });
    }
    render() {
        return (<div> 
            <div className="container-fluid">
                     <Button variant='outline-primary' onClick={this.props.focusDrink}>Back</Button>
                    <div className="row">
                        <div className="col-lg-6">
                            <h1>{this.props.drink.d_name}</h1>
                            <h3>{this.props.drink.d_cat}</h3>
                            <ul>
                            {this.parseIngredients(this.props.drink.d_ingredients).map((ingredient, index) =>
                                <li key={index}>{ingredient}</li>
                            )}
                            </ul>
                            <p>{this.props.drink.d_instructions}</p>
                            <p>Recommended Serving Glass: <strong>{this.props.drink.d_glass}</strong></p>
                            <Button onClick={() => console.log('Favorited!')}>Favorite Drink</Button>
                        </div>
                        <div className="col-lg-6">
                            <Figure> 
                                <Figure.Image 
                                    width={171}
                                    height={180}
                                    alt="Image Not Found"
                                    src={this.props.drink.d_img_url}/>
                            </Figure>
                        </div>
                    </div>
                </div>
            
            </div>);
    }
}

export default FocusDrink;

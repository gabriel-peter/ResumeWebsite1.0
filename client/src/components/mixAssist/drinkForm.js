import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import { Formik } from 'formik';
import * as yup from 'yup';

import IngredientList from './ingredientList';

/**
    d_name text,
    d_cat text,
    d_alcohol text,
    d_glass text,
    d_instructions text,
    d_img_url text,
    d_ingredients text
 */

const schema = yup.object({
  name: yup.string().required(),
  category: yup.string().required(),
  owner: yup.string().required(),
  glass: yup.string().required(),
  ingredients: yup.string().required(),
  instructions: yup.string().required(),
//   file: yup.file().required(),
});

class DrinkForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredientCount: 3,
            ingredients: {},
        }
        
        this.categories = ['Ordinary Drink','Cocktail','Milk / Float / Shake', 'Other/Unknown',
                'Cocoa','Shot','Coffee / Tea','Homemade Liqueur','Punch / Party Drink','Beer',
                'Soft Drink / Soda'];
        this.glasses= ['Highball glass',
                'Cocktail glass',
                'Old-fashioned glass',
                'Collins glass',
                'Pousse cafe glass',
                'Champagne flute',
                'Whiskey sour glass',
                'Brandy snifter',
                'White wine glass',
                'Nick and Nora Glass',
                'Hurricane glass',
                'Coffee mug',
                'Shot glass',
                'Jar',
                'Irish coffee cup',
                'Punch bowl',
                'Pitcher',
                'Pint glass',
                'Copper Mug',
                'Wine Glass',
                'Cordial glass',
                'Beer mug',
                'Margarita/Coupette glass',
                'Beer pilsner',
                'Beer Glass',
                'Parfait glass',
                'Mason jar',
                'Margarita glass',
                'Martini Glass',
                'Balloon Glass',
                'Coupe Glass',];
    }
    render(){
        return (<div>
            {/* <Button variant="outline-warning" onClick={this.props.toggleForm}>Cancel</Button> */}
            <Formik
            validationSchema={schema}
            onSubmit={console.log}
            >
        {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
        }) => (
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                <Form.Group as={Col} sm="12" md="6"
                // controlId="formBasicEmail"
                >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="The Super Margarita?" />
                    <Form.Text className="text-muted">
                    Enter the name of your custom drink!
                    </Form.Text>
                </Form.Group>

                <Form.Group as={Col} sm="12" md="6"
                // controlId="formBasicPassword"
                >
                    <Form.Label>Name of Creator</Form.Label>
                    <Form.Control type="text" placeholder="John Doe" />
                </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} sm="12" md="6">
                        <Form.Control
                            as="select"
                            className="mr-sm-2"
                            id="inlineFormCustomSelect"
                            custom
                        >
                            {this.categories.map((item, index) =>
                                <option value={index}>{item}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} sm="12" md="6">
                    <Form.Control as={Col} sm="12" md="6"
                        as="select"
                        className="mr-sm-2"
                        id="inlineFormCustomSelect"
                        custom
                    >
                        {this.glasses.map((item, index) =>
                            <option value={index}>{item}</option>
                        )}
                    </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} sm="12" md="6">
                    <Form.Label>Ingredients ({this.state.ingredients.length})</Form.Label>
                    <IngredientList/>
                </Form.Group>
                <Form.Group as={Col} sm="12" md="6"
                // controlId="formBasicEmail"
                >
                    <Form.Label>Instructions</Form.Label>
                    <Form.Control as='textarea' placeholder="" />
                    {/* <Form.Text className="text-muted">
                    Enter the name of your custom drink!
                    </Form.Text> */}
                </Form.Group>
                </Form.Row>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Contains Alcohol" />
                </Form.Group>
                
                <Form.Group>
                    <Form.File
                    className="position-relative"
                    required
                    name="file"
                    label="File"
                    onChange={handleChange}
                    isInvalid={!!errors.file}
                    feedback={errors.file}
                    id="validationFormik107"
                    feedbackTooltip
                    />
                </Form.Group>
                <Button variant="primary" block type="submit">
                    Submit
                </Button>
                </Form>
                )}
                </Formik>
        </div>);
    }
}

export default DrinkForm;
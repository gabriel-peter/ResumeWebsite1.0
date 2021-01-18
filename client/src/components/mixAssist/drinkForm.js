import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { Formik, FieldArray, FieldAttributes, Field } from 'formik';
import { Select, MenuItem, TextField } from "@material-ui/core";
import * as yup from 'yup';


import { connect } from 'react-redux';
import { Dropdown, NavDropdown } from 'react-bootstrap';
// import { loginUser, logoutUser } from '../../../actions/';
const mapStateToProps = state => ({
    currentUser: state.loggedReducer
});
const mapDispatchToProps = () => {
    return {
    }
}

const schema = yup.object({
  d_name: yup.string().required(),
  d_cat: yup.string().required(),
  d_creator: yup.string().required(),
  d_glass: yup.string().required(),
  d_ingredients: yup.array().of(
    yup.object({
      item: yup.string().required(),
      measurement: yup.string().required(),
      unit: yup.string().required()
    })),
//   d_instructions: yup.string().required(),
//   file: yup.file().required(),
});

const maximumIngredients = 15;
const minimumIngredients = 2;

class DrinkForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredientCount: 3,
            ingredients: {},
        }
        this.units = ['ml', 'oz', 'grams', 'ct'];
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

        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    handleAdd() {
        if (this.state.ingredientCount !== maximumIngredients) {
            this.setState(prev => ({ingredientCount: prev.ingredientCount+1}))
        }
    }
    handleRemove() {
        if (this.state.ingredientCount !== minimumIngredients) {
            this.setState(prev => ({ingredientCount: prev.ingredientCount-1}))
        }
    }
    render(){
        return (<div>
            <Formik
                validateOnChange={true}
                validationSchema={schema}
                initialValues={{
                    d_name: '',
                    d_creator: this.props.currentUser? [this.props.currentUser.first_name, this.props.currentUser.last_name].join(' ') : '',
                    d_cat: this.categories[0],
                    d_alcohol: false,
                    d_glass: this.glasses[0],
                    d_instructions: '',
                    d_img_url: '',
                    d_ingredients: [],
                }}
                onSubmit={(data, { setSubmitting, resetForm }) => {
                    // setSubmitting(true);
                    // make async call
                    console.log("submitting /api/make-drink: ", data);
                    fetch("/api/make-drink", {
                        method: "post",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
            
                        //make sure to serialize your JSON body
                        body: JSON.stringify(data)
                    }).then(response => response.json()).then(res => {
                        console.log(res);
                        // TODO Handle failed submission.
                        setSubmitting(false);
                    })
                    // resetForm();
                }}
            >
        {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            isSubmitting,
            errors,
        }) => (
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} sm="12" md="6"
                    // controlId="formBasicEmail"
                    >
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name='d_name'
                            placeholder="The Super Margarita?"
                            onChange={handleChange}
                            isValid={touched.d_name && !errors.d_name}
                        />
                        <Form.Text className="text-muted">
                        Enter the name of your custom drink!
                        </Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} sm="12" md="6">
                        <Form.Label>Name of Creator</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="John Doe"
                            name='d_creator'
                            onChange={handleChange}
                            isValid={touched.d_creator && !errors.d_creator}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} sm="12" md="6">
                        <Form.Control
                            as="select"
                            name='d_cat'
                            className="mr-sm-2"
                            onChange={handleChange}
                            custom
                        >
                            {this.categories.map((item, index) =>
                                <option key={index} value={item}>{item}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} sm="12" md="6">
                    <Form.Control 
                        as="select"
                        name='d_glass'
                        className="mr-sm-2"
                        onChange={handleChange}
                        custom
                    >
                        {this.glasses.map((item, index) =>
                            <option key={index} value={item}>{item}</option>
                        )}
                    </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} sm="12" md="6">
                    <Form.Label>Ingredients ({this.state.ingredientCount})</Form.Label>
                    <FieldArray name='d_ingredients'>
                        {(arrayHelpers) => (
                            <div>
                                <Button onClick={() => arrayHelpers.push({item: '', measurement: '', unit: 'ml'})}>Add Item</Button>
                                {values.d_ingredients.map((ingredient, index) => {
                                    return(
                                        <Container fluid key={index}>
                                        {/* <Row>
                                            <Col> */}
                                            <TextField
                                                placeholder="Untitled"
                                                name={`d_ingredients.${index}.item`}
                                                onChange={handleChange}
                                            />
                                            {/* </Col>
                                            <Col> */}
                                            <TextField
                                                placeholder="Measurement"
                                                name={`d_ingredients.${index}.measurement`}
                                                onChange={handleChange}
                                            />
                                            {/* </Col>
                                            <Col> */}
                                            <Field type='select' name={`d_ingredients.${index}.unit`} as={Select}>
                                                {this.units.map((unit, i) => <MenuItem key={i} value={unit}>{unit}</MenuItem>)}
                                            </Field>
                                            {/* </Col>
                                            <Col> */}
                                            <Button variant='outline-secondary' onClick={() => arrayHelpers.remove(index)}>
                                                X
                                            </Button>
                                            {/* </Col> */}
                                        {/* </Row> */}
                                        </Container>
                                        );
                                })}
                            </div>
                        )}
                    </FieldArray> 
                </Form.Group>
                <Form.Group as={Col} sm="12" md="6">
                    <Form.Label>Instructions</Form.Label>
                    <Form.Control 
                        name='d_instructions'
                        as='textarea'
                        onChange={handleChange} 
                        placeholder="" />
                    {/* <Form.Text className="text-muted">
                    Enter the name of your custom drink!
                    </Form.Text> */}
                </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.Check 
                        name='d_alcohol'
                        type="checkbox"
                        onChange={handleChange}
                        label="Contains Alcohol" />
                </Form.Group>
                
                <Form.Group>
                    <Form.File
                        className="position-relative"
                        // required
                        name="file"
                        label="File"
                        onChange={handleChange}
                        // isInvalid={!!errors.file}
                        // feedback={errors.file}
                        id="validationFormik107"
                        feedbackTooltip
                    />
                </Form.Group>
                <Button 
                    variant="primary" 
                    block 
                    type="submit"
                    disabled={isSubmitting}

                >
                    Submit
                </Button>
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
                </Form>
                )}
                </Formik>
        </div>);
    }
}

export default connect(mapStateToProps)(DrinkForm);
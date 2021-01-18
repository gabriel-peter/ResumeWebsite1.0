// @ts-nocheck
import React, { Component } from 'react'
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
// import { createBrowserHistory } from 'history';
// import GoogleButton from './googleButton';
// import FacebookButton from './facebookButton';
// https://developers.google.com/identity/sign-in/web/reference
// https://console.developers.google.com/apis/credentials?project=seventh-server-263618
// https://developers.facebook.com/apps/1549733092042098/fb-login/settings/
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../../../actions/';
const mapStateToProps = state => ({
    currentUser: state.loggedReducer
});
const mapDispatchToProps = () => {
    return {
        loginUser,
        logoutUser
    }
}
class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authentication: null,
            loginMethod: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleFacebookSignUp = this.handleFacebookSignUp.bind(this);
        this.handleGoogleSignUp = this.handleGoogleSignUp.bind(this);
    }
    handleFacebookSignUp() {
        // LOAD ACCOUNT INFO

        // PARSE DATA

        // Proceed to Additional Info
        this.setState({authentication: 
            {
                first_name: "Elias",
                last_name: 'Peter',
                email: 'epeter1@hwemail.com',
                facebook_id: '242424',
                google_id: 'None',
                date_of_birth: '06.08.2002',
                gender: 'male',
                liked_drinks: '',   
            }, loginMethod: 'Facebook'})
    }
    handleGoogleSignUp() {
        // LOAD ACCOUNT INFO

        // PARSE DATA

        // Proceed to Additional Info
        this.setState({authentication: 
            {
                first_name: "Elias",
                last_name: 'Peter',
                email: 'epeter1@hwemail.com',
                facebook_id: 'None',
                google_id: '3053509',
                date_of_birth: '06.08.2002',
                gender: 'male',
                liked_drinks: '',
            }, loginMethod: 'Google'})
    }
    componentDidMount() {
        // LOAD GOOGLE API

        // LOAD FACEBOOK API
    }
    onSubmit(e) {
        e.preventDefault();
        console.log('Sending user make request')
        fetch("/api/signup", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify(this.state.authentication)
        }).then(response => response.json()).then(res => { 
            //do something awesome that makes the world a better place
            // IF SUCCESS, 
            // currentUser = response.user;
            var currentUser = this.state.authentication;
            currentUser.loginMethod = this.state.loginMethod;
            this.props.loginUser(currentUser);
            // Go back to home page
            // createBrowserHistory().replace('/mix')
            this.props.history.push('/mix');
        });
    }
    render() {
        return (
            <Card>
                {/* {this.renderRedirect()} */}
                <Card.Body>
                    {this.props.currentUser && <p>You are already logged in (TODO)</p>}
                    <Card.Title>Sign Up!</Card.Title>
                    {this.state.authentication===null ?
                    <div>
                        <Card.Text>
                        <Button
                            variant='success'
                            onClick={this.handleGoogleSignUp}
                        >Sign-Up with Google</Button>
                        </Card.Text>
                        <Card.Text>
                        <Button
                            onClick={this.handleFacebookSignUp}
                        >Sign-Up with Facebook</Button>
                        </Card.Text>
                    </div>
                    :
                    <div>
                        <Card.Title>Additional Information</Card.Title>
                        <Form onSubmit={this.onSubmit}>
                            {/* <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group> */}
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Verify you are over 21 years of Age" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                    }
                    <br/>
                    <Card.Text>Already have an account? <a href='/login'>Log-in!</a></Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(SignUpPage));

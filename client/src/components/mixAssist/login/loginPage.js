// @ts-nocheck
import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
import GoogleButton from './googleButton';
import FacebookButton from './facebookButton';
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
class LoginPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const loginMethod = this.props.currentUser ? this.props.currentUser.loginMethod : 'None';
        console.log(this.props.currentUser)
        return (
            <Card>
                <Card.Body>
                <Card.Title>{this.props.currentUser!==null ? `Welcome, ${this.props.currentUser.first_name}` : 'Login!'}</Card.Title>
                
                {(loginMethod === 'Google' || loginMethod === 'None') && <Card.Text><GoogleButton /></Card.Text>}
                {(loginMethod === 'Facebook' || loginMethod === 'None') && <Card.Text><FacebookButton /></Card.Text>}
                    {!this.props.currentUser && <Button variant='link' href='/signup'>Sign up?</Button>}
                </Card.Body>
                <Button variant='link' href='/mix'>Go back to Home</Button>
            </Card>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(LoginPage);

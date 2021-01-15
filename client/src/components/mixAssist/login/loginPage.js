// @ts-nocheck
import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
import GoogleButton from './googleButton';
import FacebookButton from './facebookButton';
// https://developers.google.com/identity/sign-in/web/reference
// https://console.developers.google.com/apis/credentials?project=seventh-server-263618
// https://developers.facebook.com/apps/1549733092042098/fb-login/settings/

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props)
    }
    updateUser() {

    }
    render() {
        var isLoggedIn = this.props.user ? true : false;
        return (
            <Card>
                <Card.Body>
                <Card.Title>{isLoggedIn ? `Welcome, ${this.props.user.first_name}` : 'Login!'}</Card.Title>
                {/* {this.props.user ? */}
                <Card.Text><GoogleButton loginUser={this.props.loginUser} /></Card.Text>
                <Card.Text><FacebookButton loginUser={this.props.loginUser} /></Card.Text>
                    {isLoggedIn ? 
                        <Button variant='link' onClick={this.signOutGoogle}>Sign-out?</Button>
                        :
                        <Button variant='link' href='/signup'>Sign up?</Button>
                    }
                </Card.Body>
            </Card>
        )
    }
}

export default LoginPage;

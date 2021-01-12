import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
// https://developers.google.com/identity/sign-in/web/reference
// https://console.developers.google.com/apis/credentials?project=seventh-server-263618
// https://developers.facebook.com/apps/1549733092042098/fb-login/settings/
export default class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: null   
        }
        this.onSuccessGoogle = this.onSuccessGoogle.bind(this);
        this.onSuccessFB = this.onSuccessFB.bind(this);
        this.signOutGoogle = this.signOutGoogle.bind(this);
        this.loginFacebook = this.loginFacebook.bind(this);
    }
    onSuccessGoogle(data) {
        // console.log('USER IS LOGGED IN', data);
        // console.log('GOOGLE ID', data.Ea);
        // var profile = data.getBasicProfile();
        // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail()); 
        // fetch('/api/user/google-id/' + data.Ea)
        // .then(response => response.json())
        // .then(response => {
        //     // TODO if error, it means they need to signup!!! redirect to sign-up page
        //     this.setState({isLoggedIn: true, user: response[0]});
        //     console.log(response);
        // })
        // OR just redirect?
        // window.location
    }
    onSuccessFB(data) {
    //     const userID = data.userID;
    //     fetch('/api/user/facebook-id/' + userID)
    //     .then(response => response.json())
    //     .then(response => {
    //         // TODO if error, it means they need to signup!!! redirect to sign-up page
    //         if (response.length === 0) {
    //             console.log('No Account Found!');
    //             // TODO REDIRECT
    //             window.location = '/signup'
    //         } else {
    //         console.log(response);
    //         this.setState({isLoggedIn: true, user: response[0]});
    //         }
    //     })
    }
    signOutGoogle() {
        // var auth2 = window.gapi.auth2.getAuthInstance();
        // auth2.signOut().then(() => {
        //     console.log('User signed out.');
        //     this.setState({isLoggedIn: false, user: null})
        // });
    }
    loginFacebook() {
        // window.FB.login((response) => {
        //     // handle the response
        //     console.log(response);
        //     if (response.status === 'connected') {
        //         this.onSuccessFB(response)
        //     }
        //   }, {scope: 'public_profile,email'});
    }
    componentDidMount() {
        // TODO USE HOOK HERE
        window.FB.getLoginStatus((response) => {
            // statusChangeCallback(response);
            console.log(response);
            if (response.status === 'not_authorized') {
                this.setState({isLoggedIn: false})
            } else if (response.status === 'connected') {
                this.onSuccessFB(response);
            }
        });
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
            client_id: '132477595847-r1sr878h3i4k15ubthj42s3vrrrs2lk7.apps.googleusercontent.com'
        }).then(() => {
            window.gapi.signin2.render('my-signIn', {
              'scope': 'profile email',
              'width': 250,
              'height': 50,
              'longtitle': false,
              'theme': 'dark',
              'onsuccess': this.onSuccessGoogle,
              'onfailure': (error) => console.log(error)
            })
          }) 
        })    
    }
    render() {
        return (
            <Card>
                <Card.Body>
                <Card.Title>{this.state.isLoggedIn ? `Welcome, ${this.state.user.first_name}` : 'Sign-Up!'}</Card.Title>
                <Card.Text>
                    {/* GOOGLE BUTTON */}
                    <div id="my-signIn" />
                    <br/>
                    {/* FACEBOOK BUTTON */}
                    {/* <div 
                        class="fb-login-button" 
                        data-width="250" 
                        data-size="large" 
                        data-button-type="login_with"
                        // data-layout="" 
                        // data-auto-logout-link="true" 
                        // data-use-continue-as="true"
                        ></div> */}
                    <Button onClick={this.loginFacebook}>Login With Facebook</Button>
                </Card.Text>
                    {this.state.isLoggedIn ? 
                        <Button variant='link' onClick={this.signOutGoogle}>Sign-out?</Button>
                        :
                        <Button variant='link' onClick={() => console.log('TODO')}>Sign up?</Button>
                    }
                </Card.Body>
            </Card>
        )
    }
}

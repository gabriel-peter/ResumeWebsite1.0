import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';

class GoogleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
        this.onSuccessGoogle = this.onSuccessGoogle.bind(this);
        this.onErrorGoogle = this.onErrorGoogle.bind(this);
        this.signOutGoogle = this.signOutGoogle.bind(this);
        this.loginGoogle = this.loginGoogle.bind(this);

    }
    onSuccessGoogle(data) {
        console.log('USER IS LOGGED IN', data);
        console.log('GOOGLE ID', data.Ea);
        var profile = data.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); 
        fetch('/api/user/google-id/' + data.Ea)
        .then(response => response.json())
        .then(response => {
            // TODO if error, it means they need to signup!!! redirect to sign-up page
            this.setState({loggedIn: true});
            // TODO
            // console.log(this.props)
            // this.props.loginUser(response);
            console.log(response);
        })
        // OR just redirect?
        // window.location
    }
    onErrorGoogle(data) {

    }
    signOutGoogle() {
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            console.log('User signed out.');
            this.setState({isLoggedIn: false, user: null})
        });
    } 
    loginGoogle() {
        // TODO
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signIn().then(response => {
            this.onSuccessGoogle(response);
        })
    }
    componentDidMount() {
        var script = document.createElement('script');
        script.src = 'https://apis.google.com/js/client.js'
        document.body.appendChild(script);
        this.loadGAPI(script);
    }
    loadGAPI(script) {
        // Retries GAPI load if not ready and 'processed' yet
        // https://stackoverflow.com/questions/19892662/what-does-gapi-processed-mean/33591421
        // https://gist.github.com/mikecrittenden/28fe4877ddabff65f589311fd5f8655c
        if(script.getAttribute('gapi_processed')){
            window.gapi.load('auth2', () => {
                window.gapi.auth2.init({
                client_id: '132477595847-r1sr878h3i4k15ubthj42s3vrrrs2lk7.apps.googleusercontent.com'
                }).then((res, err) => {
                    if (res.isSignedIn.get() === true) {
                        var currentUser = res.currentUser.we;
                        this.onSuccessGoogle(currentUser);
                        console.log('User is currently signed into Google.', res);
                    }
                }) 
            })
        } else {
            console.log('Client wasn\'t ready, trying again in 100ms');
            setTimeout(() => {this.loadGAPI(script)}, 100);
        }
    }
    render() {
        return(
            <Button 
                onClick={this.state.loggedIn ? this.signOutGoogle : this.loginGoogle} 
                variant='success'
            >
                {this.state.loggedIn ? 'Logout' : 'Login with Google'}
            </Button>
        )
        }
    }

export default GoogleButton;
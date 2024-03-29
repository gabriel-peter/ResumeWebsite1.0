import React, { Component } from 'react'
import { Card, Button, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
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
class GoogleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
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
            response = response[0]
            response.loginMethod = 'Google'
            // TODO if error, it means they need to signup!!! redirect to sign-up page
            this.props.loginUser(response);
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
            this.props.logoutUser();
        });
    } 
    loginGoogle() {
        // TODO
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signIn().then(response => {
            this.onSuccessGoogle(response);
        })
        // Should only be called after logging in via button click
        this.props.history.push('/mix')
    }
    componentDidMount() {
        var script = document.createElement('script');
        script.src = 'https://apis.google.com/js/client.js'
        document.body.appendChild(script);
        this.loadGAPI(script, 0);
    }
    loadGAPI(script, attempt) {
        // Retries GAPI load if not ready and 'processed' yet
        // https://stackoverflow.com/questions/19892662/what-does-gapi-processed-mean/33591421
        // https://gist.github.com/mikecrittenden/28fe4877ddabff65f589311fd5f8655c
        // TODO BUTTONS NEED TO BE DISABLED UNTIL LOADED.
        if (script.getAttribute('gapi_processed')){
            this.setState({isLoading: false})
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
            // TODO IF CERTAIN AMOUNT OF ATTEMPTS, SHOW ERROR
            if (attempt >= 40) {
                // TODO 
                console.log('Failed to connect to Google. Aborting');
            } else {
                console.log('Client wasn\'t ready, trying again in 100ms');
                setTimeout(() => {this.loadGAPI(script, attempt+1)}, 100);
            }
        }
    }
    render() {
        return(
            <div>
            {this.state.isLoading ?
            <Spinner animation="border" variant="success" />
            :
            <Button
                onClick={this.props.currentUser ? this.signOutGoogle : this.loginGoogle} 
                variant='success'
            >
                {this.props.currentUser ? 'Logout' : 'Login with Google'}
            </Button>}
            </div>
        )
        }
    }

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(GoogleButton));
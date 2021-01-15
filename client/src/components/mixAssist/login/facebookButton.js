import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';

class FacebookButton extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.onSuccessFB = this.onSuccessFB.bind(this);
        this.loginFacebook = this.loginFacebook.bind(this);
        this.signoutFacebook = this.signoutFacebook.bind(this);

    }
    signoutFacebook() {

    }
    onSuccessFB(data) {
        const userID = data.userID;
        fetch('/api/user/facebook-id/' + userID)
        .then(response => response.json())
        .then(response => {
            // TODO if error, it means they need to signup!!! redirect to sign-up page
            if (response.length === 0) {
                console.log('No Account Found!');
                // TODO REDIRECT
                // window.location = '/signup'
            } else {
            console.log(response);
            this.setState({isLoggedIn: true, user: response[0]});
            }
        })
    }
    loginFacebook() {
        window.FB.login((response) => {
            // handle the response
            console.log(response);
            if (response.status === 'connected') {
                this.onSuccessFB(response)
            }
          }, {scope: 'public_profile,email'});
    }
    componentDidMount() {
        window.fbAsyncInit = () => {
            window.FB.init({
              appId      : '1549733092042098',
              cookie     : true,
              xfbml      : true,
              version    : 'v9.0'
            });
              
            window.FB.AppEvents.logPageView();   
            window.FB.getLoginStatus((response) => {
                // statusChangeCallback(response);
                console.log(response);
                if (response.status === 'not_authorized') {
                    this.setState({isLoggedIn: false})
                } else if (response.status === 'connected') {
                    this.onSuccessFB(response);
                }
            });
          };
    }
    render() {
        return(
            <Button onClick={this.loginFacebook}>Login With Facebook</Button>
        )
    }
}

export default FacebookButton;
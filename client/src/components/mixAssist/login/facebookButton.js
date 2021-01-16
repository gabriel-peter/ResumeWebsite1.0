import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';

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
class FacebookButton extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.onSuccessFB = this.onSuccessFB.bind(this);
        this.loginFacebook = this.loginFacebook.bind(this);
        this.logoutFacebook = this.logoutFacebook.bind(this);

    }
    logoutFacebook() {
        // TODO ON FACEBOOK's END
        this.props.logoutUser();
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
            <Button 
                onClick={this.props.currentUser ? this.logoutFacebook : this.loginFacebook} 
                variant='primary'
            >
                {this.props.currentUser ? 'Logout' : 'Login with Facebook'}
            </Button>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(FacebookButton);
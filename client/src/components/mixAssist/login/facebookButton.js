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
class FacebookButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
        this.onSuccessFB = this.onSuccessFB.bind(this);
        this.loginFacebook = this.loginFacebook.bind(this);
        this.logoutFacebook = this.logoutFacebook.bind(this);

    }
    logoutFacebook() {
        // TODO ON FACEBOOK's END
        window.FB.logout((response) => {
            // Person is now logged out
            console.log(response, 'Facebook User Logged Out.')
            this.props.logoutUser();
         });
        
    }
    onSuccessFB(data) {
        const userID = data.userID;
        fetch('/api/user/facebook-id/' + userID)
        .then(response => response.json())
        .then(response => {
            // TODO if error, it means they need to signup!!! redirect to sign-up page
            if (response.length === 0) {
                console.log('No Account Found In MixAssist DB');
                // return <Redirect to='/signup/#NoAccount' />
                // TODO REDIRECT
                // window.location = '/signup'
            } else {
                console.log(response, 'User logged in with Facebook');
                response = response[0]
                response.loginMethod = 'Facebook'
                this.props.loginUser(response);
            }
        })
    }
    loginFacebook() {
        window.FB.login((response) => {
            // handle the response
            console.log(response);
            if (response.status === 'connected') {
                this.onSuccessFB(response);
                this.props.history.push('/mix');
            }
          }, {scope: 'public_profile,email'});
    }
    componentDidMount() {
        var script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js'
        script.crossOrigin="anonymous"
        document.body.appendChild(script);

        window.fbAsyncInit = () => {
            window.FB.init({
              appId      : '1549733092042098',
              cookie     : true,
              xfbml      : true,
              version    : 'v9.0'
            });
            console.log('Init Facebook Login API');
            this.setState({isLoading: false});
            window.FB.AppEvents.logPageView();  

            window.FB.getLoginStatus((response) => {
                console.log(response);
                if (response.status === 'not_authorized') {
                    // this.setState({isLoggedIn: false})
                } else if (response.status === 'connected') {
                    this.onSuccessFB(response);
                }
            });
          }
        //   console.log('2 Hit');
        //   this.setState({isLoading: false});
    }
    render() {
        return(
            <div>
            {this.state.isLoading ?
            <Spinner animation="border" variant="primary" />
            :
            <Button
                onClick={this.props.currentUser ? this.logoutFacebook : this.loginFacebook} 
                variant='primary'
            >
                {this.props.currentUser ? 'Logout' : 'Login with Facebook'}
            </Button>
            }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(FacebookButton));
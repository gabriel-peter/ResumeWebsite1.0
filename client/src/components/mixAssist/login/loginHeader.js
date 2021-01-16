import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

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
class LoginHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            googleLoggedIn: false,
        }
    }
    handleLogin(e) {
        console.log('Handling Login');
    }
    handleSignin(e) {
        console.log('Handling Sign In');
    }
    render() {
        return (
            <div>
            {this.props.currentUser ?
            <Button size='sm' variant='link' onClick={() => this.props.logoutUser()}>Logout</Button>
            :
            <div>
                <Button size='sm' variant='link' href='/login' onClick={this.handleLogin}><i>{this.state.googleLoggedIn ? 'Logout' : 'Login'}</i></Button>
                {!this.state.googleLoggedIn && <Button size='sm'  variant='link' onClick={this.handleSignin}><i>Sign-up</i></Button>} 
            </div>
            }
            <br />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(LoginHeader);
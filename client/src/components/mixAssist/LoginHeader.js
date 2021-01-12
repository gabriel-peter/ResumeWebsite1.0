import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

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
            <div>
                <Button size='sm' variant='link' href='/login' onClick={this.handleLogin}><i>{this.state.googleLoggedIn ? 'Logout' : 'Login'}</i></Button>
                {!this.state.googleLoggedIn && <Button size='sm'  variant='link' onClick={this.handleSignin}><i>Sign-in</i></Button>} 
            </div>
            <br />
            </div>
        )
    }
}

export default LoginHeader;
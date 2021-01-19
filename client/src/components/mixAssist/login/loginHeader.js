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
    // handleLogin(e) {
    //     console.log('Handling Login');
    // }
    // handleSignin(e) {
    //     console.log('Handling Sign In');
    // }
    render() {
        return (
            <div>
            {this.props.currentUser ?
            <div>
                <div>Welcome, {this.props.currentUser.first_name}</div>
                <Button size='sm' variant='link' href='/login'>Logout</Button>
            </div>
            :
            <div>
                <Button disabled size='sm' variant='link' href='/login'><i>{this.state.googleLoggedIn ? 'Logout' : 'Login'}</i></Button>
                {!this.state.googleLoggedIn && <Button size='sm' disabled variant='link' href='/signup'><i>Sign-up</i></Button>} 
            </div>
            }
            <br />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(LoginHeader);
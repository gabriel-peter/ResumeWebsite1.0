import React, { Component } from 'react'

class LoginHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
            </div>
        )
    }
}

export default LoginHeader;
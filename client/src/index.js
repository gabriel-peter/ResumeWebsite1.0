import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

const meta = document.createElement("meta");
meta.name = 'google-signin-client_id';
meta.content = '132477595847-r1sr878h3i4k15ubthj42s3vrrrs2lk7.apps.googleusercontent.com';
document.body.appendChild(meta);

// const script = document.createElement("script");
// script.src = 'https://apis.google.com/js/platform.js?onload=init';
// // Causes slow loading of button
// // script.async = true;
// // script.defer = true;
// document.body.appendChild(script);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

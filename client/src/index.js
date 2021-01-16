import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

import { createStore } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';

// STORE
// Best tutorial:  https://www.youtube.com/watch?v=m15hVENyYjI&list=PLoN_ejT35AEjvJwYyPCo3WTpZDpdlGrRu&index=8
let store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
// DISPATCH

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

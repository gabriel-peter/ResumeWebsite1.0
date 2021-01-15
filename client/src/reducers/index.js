import counterReducer from './counter';
import loggedReducer from './userLogging';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    counterReducer,
    loggedReducer
});

export default rootReducer;
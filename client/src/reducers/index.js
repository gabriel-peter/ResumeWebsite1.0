import counterReducer from './counter';
import loggedReducer from './userLogging';
import savedDrinkReducer from './drinkSaving';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    counterReducer,
    loggedReducer,
    savedDrinkReducer
});

export default rootReducer;
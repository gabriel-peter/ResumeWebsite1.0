const savedDrinkReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOAD':
            return action.payload
        case 'FAVORITE':
            return state.concat([action.payload]);
        case 'UNFAVORITE':
            return state.filter(item => item.id !== action.payload.id);
        default:
            return state;
    }
}

export default savedDrinkReducer;
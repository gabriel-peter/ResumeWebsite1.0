const loginUser = (user) => {
    return {
        type: 'LOGIN',
        payload: user
    }
}
const logoutUser = () => {
    return {
        type: 'LOGOUT'
    }
}

const incrementCount = () => {
    return {
        type: 'INCREMENT'
    }
}

const decrementCount = () => {
    return {
        type: 'DECREMENT'
    }
}

const addDrink = (drink) => {
    return {
        type: 'FAVORITE',
        payload: drink
    }
}

const dumpDrinks = (drinks) => {
    return {
        type: 'LOAD',
        payload: drinks
    }
}

const removeDrink = (drink) => {
    return {
        type: 'UNFAVORITE',
        payload: drink
    }
}

export { loginUser, logoutUser, incrementCount, decrementCount,
        addDrink, dumpDrinks, removeDrink };
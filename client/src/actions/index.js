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

export { loginUser, logoutUser, incrementCount, decrementCount };
import store from '../store'

export function isLoggedIn() {
    const token = localStorage.getItem('token')
    return token != null
}

export function login() {
    const token  = {
        username: 'Alfred'
    }

    setToken(token)
}

function setToken(token) {
    localStorage.setItem('token', JSON.stringify(token))
    store.dispatch('authenticate')
}

export function getUsername() {
    return 'Alfred'
}

export function getUserId() {
    return 1
}
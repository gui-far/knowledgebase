import axios from 'axios'

const success = res => res

//Here will check if token expired
const error = err => {
    if (402 === err.response.status) {
        window.location = '/'
    } else {
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error)
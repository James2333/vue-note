import axios from 'axios'

// create an axios instance
const noteService = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 15000 // request timeout
})

// axios.defaults.baseURL = 'http://localhost:8888'

noteService.interceptors.request.use((config) => {
    return config
})

noteService.interceptors.response.use((res) => {
    return res.data
}, err => {
    return Promise.reject(err)
})

export default noteService
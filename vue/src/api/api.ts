import axios from 'axios';

//base url for route to backend
const instance = axios.create({
    baseURL: '/api'
});

export default instance
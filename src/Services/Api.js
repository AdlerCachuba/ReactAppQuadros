import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.0.199:44338/api'
});

export default api;
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.11:44338/api'
});

export default api;
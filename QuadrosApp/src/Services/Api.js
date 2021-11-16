import axios from 'axios';

const api = axios.create({
   baseURL: 'https://192.168.1.9:3000/'
});


export default api;
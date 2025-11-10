import axios from 'axios';
const url = 'https://dummyjson.com/';
const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: url,
});
export default api
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://movie-explorer-ror-aalekh-2ewg.onrender.com',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
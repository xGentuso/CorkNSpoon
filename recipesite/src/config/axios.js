import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add response interceptor for error handling
instance.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default instance; 
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost/recipe_backend/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: false
});

// Add request interceptor for debugging
instance.interceptors.request.use(
    (config) => {
        console.log('Request:', config);
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
instance.interceptors.response.use(
    (response) => {
        console.log('Response:', response);
        return response;
    },
    (error) => {
        console.error('Response Error:', error);
        return Promise.reject(error);
    }
);

export default instance; 
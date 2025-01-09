import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost/recipe_backend/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor
instance.interceptors.request.use(
    (config) => {
        console.log('Making request to:', config.baseURL + config.url);
        return config;
    },
    (error) => {
        console.error('Request config error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor
instance.interceptors.response.use(
    (response) => {
        console.log('Received response:', response.status);
        return response;
    },
    (error) => {
        console.error('Full error details:', {
            message: error.message,
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status
        });
        return Promise.reject(error);
    }
);

export default instance; 
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export const sendOtp = (data) => {
    return api.post('/api/send-otp', data);
}

export const verifyOtp = (data) => {
    return api.post('/api/verify-otp', data);
}

export const activateUser = (data) => {
    return api.post('/api/activate', data);
}

export const logout = () => {
    return api.post('/api/logout');
}



// interceptors
api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (
        error.response.status === 401 &&
        originalRequest &&
        !originalRequest._isRetry
    ) {
        originalRequest.isRetry = true;
        try {
            await api.get(
                `${process.env.REACT_APP_API_URL}/api/refresh`,
                {
                    withCredentials: true,
                }
            );
            return api.request(originalRequest);
        } catch (err) {
            console.log(err.message);
        }
    }
    throw error;
});


export default api;






import axios from 'axios';

const BASE_URL = "http://localhost:4000"

const api = axios.create({
    baseURL:process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export const sendOtp = (data)=>{
    return api.post('/api/send-otp',data);
}

export const verifyOtp = (data)=>{
    return api.post('/api/verify-otp',data);
}


export default api;






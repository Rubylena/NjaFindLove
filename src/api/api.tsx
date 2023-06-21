import axios from "axios";

export const axiosBase = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT, DELETE,',
        'Access-Control-Allow-Headers': "Content-Type, Authorization, X-Requested-With",
        Accept: 'application/json'
    }
});
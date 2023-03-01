import axios from "axios";

export const axiosBase = axios.create({
    baseURL: 'https://bespoke.trustbancgroup.com/supportapp/api',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept-Encoding': 'br',
        'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT, DELETE,',
        'Access-Control-Allow-Headers': "Content-Type, Authorization, X-Requested-With",
        Accept: 'application/json'
    }
});
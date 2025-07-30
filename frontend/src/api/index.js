import axios from "axios";


const url = "http://127.0.0.1:8000";

export  const API = axios.create({
    baseURL: `${url}/api`,
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export const ProductImageStorage = `${url}/storage`;
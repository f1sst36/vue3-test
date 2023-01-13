import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL
})
axiosInstance.interceptors.request.use((config) => {
    // @ts-ignore
    config && (config.headers['authorization'] = `Apikey ${process.env.VUE_APP_API_KEY}`)

    return config;
})
import axios from "axios";

export const axiosInctance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});
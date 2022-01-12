import axios from "axios";


export const apiInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
})
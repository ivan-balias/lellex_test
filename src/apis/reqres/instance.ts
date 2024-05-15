import axios from "axios";

const baseURL = 'https://reqres.in';
const instance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
})

export default instance;

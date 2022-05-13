import axios from 'axios';

const baseService = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export default baseService;

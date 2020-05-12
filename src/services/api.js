import axios from "axios";
const baseURL = process.env.NODE_ENV === 'production' ? 'https://metocontagiante-backend.herokuapp.com/api' : process.env.REACT_APP_API_URL
const api = axios.create({ baseURL });

export default api;

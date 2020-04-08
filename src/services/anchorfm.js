import axios from 'axios';

const anchorfm = axios.create({ baseURL: process.env.REACT_APP_ANCHORFM_URL });

export default anchorfm;
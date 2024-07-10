import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.PUBLIC_API_URL,
  // other axios options
});

export default instance;

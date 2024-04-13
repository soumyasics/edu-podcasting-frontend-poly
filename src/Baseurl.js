import axios from 'axios';

const axiosInstance = axios.create({

  // baseURL: 'http://localhost:4008/educational_podcasting_api', 
  baseURL: 'http://hybrid.srishticampus.in/educational_podcasting_api/', 

  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance
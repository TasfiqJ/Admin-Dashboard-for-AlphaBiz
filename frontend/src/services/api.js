import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// GROUP 8 Integration
const api2 = axios.create({
  baseURL: 'http://localhost:8000',
});

export default api; 
export { api2 }; 

// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sua-api.com',
});

export const reportAnimal = async (data) => {
  try {
    const response = await api.post('/reports', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getReports = async () => {
  try {
    const response = await api.get('/reports');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
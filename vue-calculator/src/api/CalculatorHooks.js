import axios from 'axios';

const baseURL = 'http://localhost:8080'; // Adjust this according to your backend API base URL

const api = axios.create({
  baseURL: baseURL,
  timeout: 5000, // in ms
});

export const calculateResult = (expression) => {
    console.log('calculateResult', expression);
  return api.post('/api/calculate/', { expression: expression })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const calculateResultJSON = (expression) => {
  return api.post('/api/calculateJSON/', { expression: expression })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};
// services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Start a new CV generation session
export const startCVSession = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/cv-generation/session`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "true",

        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error starting CV session:', error);
    throw error;
  }
};

// Update CV data
export const updateCVData = async (sessionId, data) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/cv-generation/${sessionId}/data`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "true",

        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating CV data:', error);
    throw error;
  }
};

// Generate final CV
export const generateCV = async (sessionId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/cv-generation/${sessionId}/generate`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "true",

        },
        responseType: 'blob' // For PDF download
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error generating CV:', error);
    throw error;
  }
};
/* eslint-disable */
import axios from "axios";
import { API_CONFIG } from "../config/api";

const portfolioApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 200000,
});

// Add request interceptor for logging
portfolioApi.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
portfolioApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === 'ECONNREFUSED') {
      console.error('Backend server is not running. Please start your backend server.');
    }
    return Promise.reject(error);
  }
);

// API functions using your backend
export const companiesApi = {
  getAll: async () => {
    try {
      const response = await portfolioApi.get('/companies');
      return response.data;
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw new Error('Failed to fetch companies. Please try again.');
    }
  },

  getById: async (id) => {
    try {
      const response = await portfolioApi.get(`/companies/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching company details:', error);
      if (error.response?.status === 404) {
        throw new Error('Company not found');
      }
      throw new Error('Failed to fetch company details. Please try again.');
    }
  },

  getBySector: async (sectorId) => {
    try {
      const response = await portfolioApi.get(`/companies/sector/${sectorId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching companies by sector:', error);
      throw new Error('Failed to fetch companies by sector. Please try again.');
    }
  },
};

// Sectors API using your backend endpoints
export const sectorsApi = {
  getAll: async () => {
    try {
      const response = await portfolioApi.get('/sectors');
      return response.data;
    } catch (error) {
      console.error('Error fetching sectors:', error);
      throw new Error('Failed to fetch sectors. Please try again.');
    }
  },

  getById: async (id) => {
    try {
      const response = await portfolioApi.get(`/sectors/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sector details:', error);
      if (error.response?.status === 404) {
        throw new Error('Sector not found');
      }
      throw new Error('Failed to fetch sector details. Please try again.');
    }
  },

  getCompanies: async (id) => {
    try {
      const response = await portfolioApi.get(`/sectors/${id}/companies`);
      return response.data;
    } catch (error) {
      console.error('Error fetching companies by sector:', error);
      if (error.response?.status === 404) {
        throw new Error('Sector not found');
      }
      throw new Error('Failed to fetch companies by sector. Please try again.');
    }
  },
};

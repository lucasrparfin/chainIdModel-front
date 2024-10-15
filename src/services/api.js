import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const loginUser = async ({ username, password }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { message: 'Login failed. Please try again.' };
  }
};

export const validateChainID = async (chainID) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/validate-chainid/${chainID}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { message: 'Error validating ChainID.' };
  }
};

export const registerChainID = async (chainID) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_URL}/register-chainid`, { chainId: chainID }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { message: 'Error registering ChainID.' };
  }
};

export const getAllChainIDs = async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios.get(`${API_URL}/all-chainids`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const deleteChainID = async (chainID) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_URL}/delete-chainid/${chainID}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { message: 'Error deleting ChainID.' };
  }
};
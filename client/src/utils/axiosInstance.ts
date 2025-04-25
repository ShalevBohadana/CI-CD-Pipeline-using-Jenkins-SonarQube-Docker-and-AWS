import axios from 'axios';

import { API_BASE_URL, BEARER_PREFIX } from '../redux/api/apiSlice';
import { store } from '../redux/store';

export const axiosIns = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
  // Other default configurations, such as headers, can be added here
});

// Add an interceptor to set the authorization header
axiosIns.interceptors.request.use((config) => {
  const state = store.getState(); // Get the Redux state
  const { token } = state.auth;

  // If an accessToken exists, add the authorization header
  if (token) {
    config.headers.Authorization = `${BEARER_PREFIX} ${token}`;
  }

  return config;
});

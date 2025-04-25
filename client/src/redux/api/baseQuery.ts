import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

// Define the base URL for your API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Get the token from the auth state
    const token = (getState() as RootState).auth.token;

    // If we have a token, add it to the headers
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
  credentials: 'include', // This is important for handling cookies if you're using them
});

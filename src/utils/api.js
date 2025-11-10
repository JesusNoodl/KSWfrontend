import { supabase } from '../config/supabase';

const API_BASE_URL = 'https://kswapp.onrender.com';

// Helper to get auth token
const getAuthToken = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token;
};

// Generic API call wrapper
const apiCall = async (endpoint, options = {}) => {
  const token = await getAuthToken();
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'API request failed' }));
    throw new Error(error.detail || 'API request failed');
  }

  return response.json();
};

// Public API call wrapper (no auth required)
const publicApiCall = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'API request failed' }));
    throw new Error(error.detail || `API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Get person details
export const getPerson = async (personId) => {
  return apiCall(`/person/${personId}`);
};

// Get promotions for a student
export const getPromotionsForStudent = async (studentId) => {
  return apiCall(`/promotions/student/${studentId}`);
};

// Get current rank for a student
export const getCurrentRank = async (studentId) => {
  return apiCall(`/promotions/current/student/${studentId}`);
};

// Get belt details
export const getBelt = async (beltId) => {
  return apiCall(`/belts/${beltId}`);
};

// Get all belts
export const getAllBelts = async () => {
  return apiCall(`/belts/`);
};

// Get location
export const getLocation = async (locationId) => {
  return apiCall(`/location/${locationId}`);
};

// Get calendar events for a specific month and year (public endpoint)
export const getCalendarEvents = async (year, month) => {
  return publicApiCall(`/calendar/year/${year}/month/${month}`);
};
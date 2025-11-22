import { supabase } from '../config/supabase';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * Helper function to get the authentication headers
 */
const getAuthHeaders = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  console.log('Session error:', error);
  console.log('Session exists:', !!session);
  
  if (!session) {
    throw new Error('No active session');
  }
  
  console.log('Access token (first 20 chars):', session.access_token?.substring(0, 20));
  console.log('Token expiry:', new Date(session.expires_at * 1000));
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session.access_token}`
  };
};

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

// Get all classes (public endpoint)
export const getAllClasses = async () => {
  return publicApiCall(`/class/`);
};

export const getMyPersons = async () => {
  try {
    const headers = await getAuthHeaders();
    const url = `${API_BASE_URL}/person/me/persons`; // or /person/me/persons
    
    console.log('Full URL being called:', url);
    console.log('API_BASE_URL:', API_BASE_URL);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });
    
    // Log the response for debugging
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    // Get the raw text first to see what we're actually receiving
    const rawText = await response.text();
    console.log('Raw response:', rawText);
    
    if (!response.ok) {
      // Try to parse as JSON, but handle if it's not
      try {
        const error = JSON.parse(rawText);
        throw new Error(error.detail || 'Failed to fetch person IDs');
      } catch (parseError) {
        // If it's not JSON, throw the raw text
        throw new Error(`Server error: ${rawText}`);
      }
    }
    
    // Parse the successful response
    const personIds = JSON.parse(rawText);
    return personIds;
  } catch (error) {
    console.error('Error fetching person IDs:', error);
    throw error;
  }
};

// Get person IDs linked to current user
export const getMyPersonIds = async () => {
  return apiCall(`/person/me/persons`);
};

// Get full person details by ID
export const getPersonById = async (personId) => {
  return apiCall(`/person/${personId}`);
};

// Get awards for a student
export const getAwardsForStudent = async (studentId) => {
  return apiCall(`/awards/student/${studentId}`);
};

// Get all my persons with full details (combines both calls)
export const getMyPersonsDetails = async () => {
  try {
    // Step 1: Get the person IDs
    const personIds = await getMyPersonIds();
    
    if (!personIds || personIds.length === 0) {
      return [];
    }
    
    // Step 2: Fetch full details for each person in parallel
    const personPromises = personIds.map(personId => getPersonById(personId));
    const people = await Promise.all(personPromises);
    
    // Step 3: Filter to only active people
    return people.filter(person => person && person.active === true);
  } catch (error) {
    console.error('Error fetching person details:', error);
    throw error;
  }
};


// Get cancelled classes


export const getCancelledClasses = async () => {


  const { data, error } = await supabase


    .from('class_exception')


    .select('*, class(*)')


    .eq('cancelled', true)


    .gte('date', new Date().toISOString().split('T')[0])


    .order('date', { ascending: true });





  if (error) throw error;


  return data;


};





// Get news


export const getNews = async () => {


  const { data, error } = await supabase


    .from('news')


    .select('*')


    .not('published_at', 'is', null)


    .order('published_at', { ascending: false });





  if (error) throw error;


  return data;


};

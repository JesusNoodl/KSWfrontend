import React, { useState, useEffect } from 'react';
import { AlertCircle, User, Calendar, Award, Shield } from 'lucide-react';
import { getMyPersonsDetails } from '../api/api';

const StudentDetailsPage = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyDetails();
  }, []);

  const fetchMyDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const activePeople = await getMyPersonsDetails();
      setPeople(activePeople);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching details:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const getDisplayName = (person) => {
    const beltPrefix = person.belt_abbreviation ? `${person.belt_abbreviation} ` : '';
    return `${beltPrefix}${person.first_name} ${person.last_name}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="text-red-600" size={24} />
            <h2 className="text-lg font-semibold text-red-900">Error</h2>
          </div>
          <p className="text-red-700">{error}</p>
          <button
            onClick={fetchMyDetails}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (people.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md w-full text-center">
          <User className="mx-auto text-gray-400 mb-4" size={48} />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Details Found</h2>
          <p className="text-gray-600">There are no active records associated with your account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Details</h1>
          <p className="text-gray-600 mt-2">View information for all active members on your account</p>
        </div>

        <div className="space-y-6">
          {people.map((person) => (
            <div
              key={person.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {getDisplayName(person)}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Student ID: {person.student_id || 'N/A'}</p>
                </div>
                <div className="bg-blue-100 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-blue-800">{person.age_category || 'N/A'}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="text-gray-400 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Date of Birth</p>
                    <p className="text-gray-900">{formatDate(person.dob)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="text-gray-400 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Current Belt</p>
                    <p className="text-gray-900">{person.belt_name || 'N/A'}</p>
                    {person.korean_belt_name && (
                      <p className="text-sm text-gray-600">{person.korean_belt_name}</p>
                    )}
                  </div>
                </div>

                {person.black_belt_id && (
                  <div className="flex items-start gap-3">
                    <Shield className="text-gray-400 mt-0.5 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Black Belt ID</p>
                      <p className="text-gray-900">{person.black_belt_id}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsPage;
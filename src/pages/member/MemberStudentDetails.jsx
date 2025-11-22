import React, { useState, useEffect } from 'react';
import { AlertCircle, User, Calendar, Award, Shield } from 'lucide-react';
import { getMyPersonsDetails } from '../../utils/api';

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
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
        <div className="text-center text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
        <div className="bg-red-900 border-2 border-red-500 text-red-200 px-6 py-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle size={24} />
            <strong>Error:</strong>
          </div>
          <p>{error}</p>
          <button
            onClick={fetchMyDetails}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (people.length === 0) {
    return (
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d] text-center">
        <User className="mx-auto text-gray-400 mb-4" size={48} />
        <h2 className="text-xl font-semibold text-white mb-2">No Details Found</h2>
        <p className="text-gray-400">There are no active records associated with your account.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-6 border-2 border-[#3d3d3d]">
        <h2 className="text-3xl font-black text-white mb-4">Student Details</h2>
        <p className="text-gray-400">View information for all active members on your account</p>
      </div>

      {/* Student Cards */}
      <div className="space-y-6">
        {people.map((person) => (
          <div
            key={person.id}
            className="bg-[#1a1a1a] rounded-2xl shadow-2xl border-2 border-[#3d3d3d] overflow-hidden hover:border-[#ff6d00] transition-all duration-300"
          >
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#ff6d00] to-[#e66200] p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">
                    {getDisplayName(person)}
                  </h2>
                  <p className="text-white opacity-80 mt-1">Student ID: {person.student_id || 'N/A'}</p>
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <span className="text-sm font-bold text-white">{person.age_category || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 bg-[#2e2e2e] p-4 rounded-xl">
                  <div className="bg-[#ff6d00] p-3 rounded-lg">
                    <Calendar className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-400 mb-1">Date of Birth</p>
                    <p className="text-white font-bold">{formatDate(person.dob)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#2e2e2e] p-4 rounded-xl">
                  <div className="bg-[#ff6d00] p-3 rounded-lg">
                    <Award className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-400 mb-1">Current Belt</p>
                    <p className="text-white font-bold">{person.belt_name || 'N/A'}</p>
                    {person.korean_belt_name && (
                      <p className="text-sm text-gray-400">{person.korean_belt_name}</p>
                    )}
                  </div>
                </div>

                {person.black_belt_id && (
                  <div className="flex items-start gap-4 bg-[#2e2e2e] p-4 rounded-xl md:col-span-2">
                    <div className="bg-[#ff6d00] p-3 rounded-lg">
                      <Shield className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-400 mb-1">Black Belt ID</p>
                      <p className="text-white font-bold">{person.black_belt_id}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDetailsPage;
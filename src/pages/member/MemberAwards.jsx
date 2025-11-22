import { useState, useEffect } from 'react';
import { getMyPersons, getPerson, getAwardsForStudent } from '../../utils/api';

function MemberAwardsPage() {
  const [persons, setPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPersonsAndAwards();
  }, []);

  const loadPersonsAndAwards = async () => {
    try {
      setLoading(true);
      setError(null);

      const personIds = await getMyPersons();

      if (personIds.length === 0) {
        setError('No student profiles linked to your account. Please contact us.');
        setLoading(false);
        return;
      }

      const personDetails = await Promise.all(
        personIds.map(async (id) => {
          const person = await getPerson(id);
          return person;
        })
      );

      setPersons(personDetails);

      if (personDetails.length > 0) {
        setSelectedPerson(personDetails[0]);
        await loadAwards(personDetails[0].id);
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const loadAwards = async (personId) => {
    try {
      console.log('Loading awards for person:', personId);
      const studentAwards = await getAwardsForStudent(personId);
      console.log('Awards received:', studentAwards);

      // Handle case where no awards exist (return empty array instead of error)
      if (!studentAwards || studentAwards.length === 0) {
        setAwards([]);
        return;
      }

      // Sort by date (most recent first)
      studentAwards.sort((a, b) => new Date(b.date_achieved) - new Date(a.date_achieved));

      setAwards(studentAwards);
    } catch (err) {
      console.error('Error loading awards:', err);
      // If it's a 404 (no awards found), just set empty array instead of showing error
      if (err.message.includes('404') || err.message.includes('not found')) {
        setAwards([]);
      } else {
        setError(err.message);
      }
    }
  };

  const handlePersonChange = async (person) => {
    setSelectedPerson(person);
    setLoading(true);
    await loadAwards(person.id);
    setLoading(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const calculateTotalPoints = () => {
    return awards.reduce((sum, award) => sum + (award.points || 0), 0);
  };

  const calculateCurrentYearPoints = () => {
    const currentYear = new Date().getFullYear();
    return awards
      .filter(award => new Date(award.date_achieved).getFullYear() === currentYear)
      .reduce((sum, award) => sum + (award.points || 0), 0);
  };

  const getAwardTypeColor = (type) => {
    const colorMap = {
      competition: 'bg-purple-600 text-white',
      internal: 'bg-blue-600 text-white',
      achievement: 'bg-green-600 text-white',
      special: 'bg-orange-600 text-white',
      class: 'bg-[#ff6d00] text-white',
    };
    return colorMap[type?.toLowerCase()] || 'bg-gray-600 text-white';
  };

  const getAwardCardBackground = (type) => {
    // Highlight "class" awards with a different background
    if (type?.toLowerCase() === 'class') {
      return 'bg-gradient-to-r from-[#2e2e2e] to-[#3d2410] border-l-4 border-[#ff6d00]';
    }
    return 'bg-[#2e2e2e] border-l-4 border-[#ff6d00]';
  };

  if (loading && persons.length === 0) {
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
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-6 border-2 border-[#3d3d3d]">
        <h2 className="text-3xl font-black text-white mb-4">Awards & Achievements</h2>
        <p className="text-gray-400">View your awards, competition results and achievements</p>

        {/* Person Selector (for parents with multiple children) */}
        {persons.length > 1 && (
          <div className="mt-6">
            <label className="block text-gray-300 mb-2 font-semibold">Select Student:</label>
            <div className="flex flex-wrap gap-2">
              {persons.map((person) => (
                <button
                  key={person.id}
                  onClick={() => handlePersonChange(person)}
                  className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                    selectedPerson?.id === person.id
                      ? 'bg-[#ff6d00] text-white'
                      : 'bg-[#2e2e2e] text-gray-300 hover:bg-[#3d3d3d]'
                  }`}
                >
                  {person.first_name} {person.last_name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Points Summary Cards */}
      {selectedPerson && awards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-[#ff6d00] to-[#e66200] rounded-2xl shadow-2xl p-8 text-center">
            <h3 className="text-xl font-black text-white mb-2">Total Points</h3>
            <p className="text-5xl font-black text-white">{calculateTotalPoints()}</p>
            <p className="text-white mt-2 opacity-80">All time</p>
          </div>

          <div className="bg-gradient-to-r from-[#4CAF50] to-[#45a049] rounded-2xl shadow-2xl p-8 text-center">
            <h3 className="text-xl font-black text-white mb-2">{new Date().getFullYear()} Points</h3>
            <p className="text-5xl font-black text-white">{calculateCurrentYearPoints()}</p>
            <p className="text-white mt-2 opacity-80">This year</p>
          </div>
        </div>
      )}

      {/* Awards List */}
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
        <h3 className="text-2xl font-black text-white mb-6">Award History</h3>

        {awards.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No awards recorded yet.</p>
        ) : (
          <div className="space-y-4">
            {awards.map((award) => (
              <div
                key={award.id}
                className={`rounded-xl p-6 hover:bg-[#3d3d3d] transition-all duration-300 ${getAwardCardBackground(award.award_type)}`}
              >
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h4 className="text-white font-bold text-lg">{award.award_name}</h4>
                      <span className={`px-3 py-1 rounded-lg text-sm font-bold ${getAwardTypeColor(award.award_type)}`}>
                        {award.award_type}
                      </span>
                      {award.points != null && (
                        <span className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg text-sm font-bold">
                          {award.points} pts
                        </span>
                      )}
                    </div>

                    {award.belt_at_time && (
                      <p className="text-gray-400 text-sm mb-1">
                        🥋 {award.belt_at_time} ({award.belt_at_time_korean})
                      </p>
                    )}

                    {award.event && (
                      <p className="text-gray-400 text-sm mb-1">
                        🏆 {award.event}
                      </p>
                    )}

                    {award.tournament_category && (
                      <p className="text-gray-400 text-sm">
                        📋 Category: {award.tournament_category_upper} - {award.tournament_category}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-white font-bold">{formatDate(award.date_achieved)}</p>
                    <p className="text-gray-400 text-sm">{new Date(award.date_achieved).getFullYear()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Card */}
      {awards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#1a1a1a] rounded-xl p-6 border-2 border-[#3d3d3d] text-center">
            <p className="text-gray-400 mb-2">Total Awards</p>
            <p className="text-4xl font-black text-[#ff6d00]">{awards.length}</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-6 border-2 border-[#3d3d3d] text-center">
            <p className="text-gray-400 mb-2">First Award</p>
            <p className="text-lg font-bold text-white">
              {formatDate(awards[awards.length - 1].date_achieved)}
            </p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-6 border-2 border-[#3d3d3d] text-center">
            <p className="text-gray-400 mb-2">Latest Award</p>
            <p className="text-lg font-bold text-white">{formatDate(awards[0].date_achieved)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberAwardsPage;
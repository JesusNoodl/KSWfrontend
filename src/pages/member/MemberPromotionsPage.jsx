import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getMyPersons, getPerson, getPromotionsForStudent, getBelt, getLocation } from '../../utils/api';

function Promotions() {
  const { user } = useAuth();
  const [persons, setPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPersonsAndPromotions();
  }, [user]);

  const loadPersonsAndPromotions = async () => {
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
        await loadPromotions(personDetails[0].id);
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const loadPromotions = async (personId) => {
    try {
      const promos = await getPromotionsForStudent(personId);

      const enrichedPromotions = await Promise.all(
        promos.map(async (promo) => {
          const [belt, location] = await Promise.all([
            getBelt(promo.belt_id),
            getLocation(promo.location_id),
          ]);
          return { ...promo, belt, location };
        })
      );

      enrichedPromotions.sort((a, b) => new Date(b.promotion_date) - new Date(a.promotion_date));

      setPromotions(enrichedPromotions);
    } catch (err) {
      console.error('Error loading promotions:', err);
      setError(err.message);
    }
  };

  const handlePersonChange = async (person) => {
    setSelectedPerson(person);
    setLoading(true);
    await loadPromotions(person.id);
    setLoading(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getBeltColor = (color) => {
    const colorMap = {
      white: 'bg-gray-100 text-gray-900',
      yellow: 'bg-yellow-400 text-gray-900',
      orange: 'bg-orange-500 text-white',
      green: 'bg-green-600 text-white',
      blue: 'bg-blue-600 text-white',
      red: 'bg-red-600 text-white',
      brown: 'bg-amber-800 text-white',
      black: 'bg-black text-white',
    };
    return colorMap[color.toLowerCase()] || 'bg-gray-500 text-white';
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
        <h2 className="text-3xl font-black text-white mb-4">Promotion History</h2>
        <p className="text-gray-400">View your belt progression and achievements</p>

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

      {/* Current Rank Card */}
      {selectedPerson && promotions.length > 0 && (
        <div className="bg-gradient-to-r from-[#ff6d00] to-[#e66200] rounded-2xl shadow-2xl p-8 text-center">
          <h3 className="text-2xl font-black text-white mb-4">Current Rank</h3>
          <div className={`inline-block px-8 py-4 rounded-xl text-3xl font-black ${getBeltColor(promotions[0].belt.primary_colour)}`}>
            {promotions[0].belt.name}
            {promotions[0].tabs > 0 && (
              <span className="ml-3">
                {Array.from({ length: promotions[0].tabs }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </span>
            )}
          </div>
          <p className="text-white mt-4 text-lg">{promotions[0].belt.korean_name}</p>
        </div>
      )}

      {/* Promotions Timeline */}
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
        <h3 className="text-2xl font-black text-white mb-6">Promotion Timeline</h3>

        {promotions.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No promotions recorded yet.</p>
        ) : (
          <div className="space-y-4">
            {promotions.map((promo, index) => (
              <div
                key={promo.id}
                className="bg-[#2e2e2e] rounded-xl p-6 border-l-4 border-[#ff6d00] hover:bg-[#3d3d3d] transition-all duration-300"
              >
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-4 py-2 rounded-lg font-bold ${getBeltColor(promo.belt.primary_colour)}`}>
                        {promo.belt.name}
                      </span>
                      {promo.tabs > 0 && (
                        <span className="text-yellow-400 text-xl">
                          {Array.from({ length: promo.tabs }).map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </span>
                      )}
                      {index === 0 && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{promo.belt.korean_name}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-white font-bold">{formatDate(promo.promotion_date)}</p>
                    <p className="text-gray-400 text-sm">📍 {promo.location.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Card */}
      {promotions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#1a1a1a] rounded-xl p-6 border-2 border-[#3d3d3d] text-center">
            <p className="text-gray-400 mb-2">Total Promotions</p>
            <p className="text-4xl font-black text-[#ff6d00]">{promotions.length}</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-6 border-2 border-[#3d3d3d] text-center">
            <p className="text-gray-400 mb-2">First Promotion</p>
            <p className="text-lg font-bold text-white">
              {formatDate(promotions[promotions.length - 1].promotion_date)}
            </p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-6 border-2 border-[#3d3d3d] text-center">
            <p className="text-gray-400 mb-2">Latest Promotion</p>
            <p className="text-lg font-bold text-white">{formatDate(promotions[0].promotion_date)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Promotions;
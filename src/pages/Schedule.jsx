import { useState, useEffect } from 'react';
import { getAllClasses } from '../utils/api';

function Schedule() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const dayNumberToName = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching classes from API...');
      const data = await getAllClasses();
      
      // Filter for active classes based on active_from and active_to dates
      const now = new Date();
      const activeClasses = data?.filter(cls => {
        // If no active dates set, class is always active
        if (!cls.active_from && !cls.active_to) return true;
        
        const activeFrom = cls.active_from ? new Date(cls.active_from) : null;
        const activeTo = cls.active_to ? new Date(cls.active_to) : null;
        
        // Check if current date is within active range
        if (activeFrom && now < activeFrom) return false;
        if (activeTo && now > activeTo) return false;
        
        return true;
      }) || [];
      
      // Sort by day_number and then start_time
      activeClasses.sort((a, b) => {
        if (a.day_number !== b.day_number) {
          return a.day_number - b.day_number;
        }
        return a.start_time.localeCompare(b.start_time);
      });
      
      setClasses(activeClasses);
      console.log('Fetched classes from API:', activeClasses);
      
    } catch (error) {
      console.error('Error fetching classes:', error);
      setError(`Failed to load schedule: ${error.message}. Please check your internet connection and try again.`);
    } finally {
      setLoading(false);
    }
  };

  const groupClassesByDay = () => {
    const grouped = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    };

    classes.forEach(classInfo => {
      const dayName = dayNumberToName[classInfo.day_number];
      if (dayName) {
        grouped[dayName].push(classInfo);
      }
    });

    return grouped;
  };

  const formatTime = (time) => {
    if (!time) return '';
    return time.substring(0, 5);
  };

  const getClassColor = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('little lions') || titleLower.includes('white') || titleLower.includes('yellow')) {
      return 'bg-green-100 border-green-400 text-gray-900';
    } else if (titleLower.includes('junior')) {
      return 'bg-yellow-100 border-yellow-400 text-gray-900';
    } else if (titleLower.includes('adult') || titleLower.includes('red') || titleLower.includes('brown')) {
      return 'bg-red-100 border-red-400 text-gray-900';
    } else if (titleLower.includes('tournament') || titleLower.includes('weapons')) {
      return 'bg-purple-100 border-purple-400 text-gray-900';
    }
    return 'bg-blue-100 border-blue-400 text-gray-900';
  };

  const schedule = groupClassesByDay();

  if (loading) {
    return (
      <div className="bg-[#2e2e2e] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center text-white text-2xl">Loading schedule...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#2e2e2e] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-red-900 border-2 border-red-500 text-red-200 px-6 py-4 rounded-xl">
            <strong>Error:</strong> {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#2e2e2e] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">Class Schedule</h1>
          <div className="w-24 h-1 bg-[#ff6d00] mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">All times are UK time (GMT/BST)</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 bg-[#1a1a1a] p-6 rounded-xl">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 border-2 border-green-400 rounded mr-2"></div>
            <span className="text-sm text-white">Beginner / Little Lions</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-400 rounded mr-2"></div>
            <span className="text-sm text-white">Junior Classes</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-100 border-2 border-red-400 rounded mr-2"></div>
            <span className="text-sm text-white">Adult / Advanced</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-100 border-2 border-purple-400 rounded mr-2"></div>
            <span className="text-sm text-white">Special Classes</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-100 border-2 border-blue-400 rounded mr-2"></div>
            <span className="text-sm text-white">All Ages</span>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {days.map((day) => (
            <div key={day} className="bg-[#1a1a1a] rounded-xl shadow-2xl overflow-hidden border-2 border-[#3d3d3d] hover:border-[#ff6d00] transition-all duration-300">
              {/* Day Header */}
              <div className="bg-gradient-to-r from-[#ff6d00] to-[#e66200] text-white py-3 px-4 font-black text-center">
                {day}
              </div>
              
              {/* Classes for this day */}
              <div className="p-3 space-y-3 min-h-[300px]">
                {schedule[day].length > 0 ? (
                  schedule[day].map((classInfo) => (
                    <div 
                      key={classInfo.id}
                      className={`border-2 rounded-lg p-3 ${getClassColor(classInfo.title)} hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer`}
                      title={classInfo.description}
                    >
                      <div className="font-bold text-sm mb-1">
                        {formatTime(classInfo.start_time)} - {formatTime(classInfo.end_time)}
                      </div>
                      <div className="font-semibold mb-1 text-sm">
                        {classInfo.title}
                      </div>
                      {classInfo.description && (
                        <div className="text-xs line-clamp-2 opacity-75">
                          {classInfo.description}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-8 text-sm">
                    No classes scheduled
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-gradient-to-r from-[#ff6d00] to-[#e66200] p-8 rounded-2xl shadow-2xl">
          <h3 className="font-black text-2xl mb-4 text-white">📋 Important Information</h3>
          <ul className="space-y-3 text-white text-lg">
            <li>• Please arrive 10 minutes early for your first class</li>
            <li>• Bring water and wear comfortable workout clothing</li>
            <li>• Contact us to book a free trial class</li>
            <li>• Private lessons available - enquire at reception</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

function Schedule() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Map day_number to day name
  const dayNumberToName = {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday'
  };

  useEffect(() => {
    fetchClasses();
  }, []);

const fetchClasses = async () => {
  try {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('class')
      .select('*')
      .order('day_number', { ascending: true })
      .order('start_time', { ascending: true });

    if (error) throw error;

    // Filter active classes in JavaScript instead
    const activeClasses = data?.filter(cls => cls.is_active === true) || [];
    setClasses(activeClasses);
    
  } catch (error) {
    console.error('Error fetching classes:', error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

  // Group classes by day
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

  // Format time from 24hr to 12hr format (optional)
  const formatTime = (time) => {
    if (!time) return '';
    // Time is already in HH:MM:SS format, just remove seconds
    return time.substring(0, 5);
  };

  // Determine class color based on title/description
  const getClassColor = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('little lions') || titleLower.includes('white') || titleLower.includes('yellow')) {
      return 'bg-green-100 border-green-400';
    } else if (titleLower.includes('junior')) {
      return 'bg-yellow-100 border-yellow-400';
    } else if (titleLower.includes('adult') || titleLower.includes('red') || titleLower.includes('brown')) {
      return 'bg-red-100 border-red-400';
    } else if (titleLower.includes('tournament') || titleLower.includes('weapons')) {
      return 'bg-purple-100 border-purple-400';
    }
    return 'bg-blue-100 border-blue-400';
  };

  const schedule = groupClassesByDay();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="text-2xl">Loading schedule...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-4">Class Schedule</h1>
      <p className="text-gray-600 mb-8">All times are UK time (GMT/BST)</p>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-100 border-2 border-green-400 rounded mr-2"></div>
          <span className="text-sm">Beginner / Little Lions</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-400 rounded mr-2"></div>
          <span className="text-sm">Junior Classes</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-100 border-2 border-red-400 rounded mr-2"></div>
          <span className="text-sm">Adult / Advanced</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-purple-100 border-2 border-purple-400 rounded mr-2"></div>
          <span className="text-sm">Special Classes</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-100 border-2 border-blue-400 rounded mr-2"></div>
          <span className="text-sm">All Ages</span>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {days.map((day) => (
          <div key={day} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Day Header */}
            <div className="bg-blue-600 text-white py-3 px-4 font-bold text-center">
              {day}
            </div>
            
            {/* Classes for this day */}
            <div className="p-3 space-y-3 min-h-[300px]">
              {schedule[day].length > 0 ? (
                schedule[day].map((classInfo) => (
                  <div 
                    key={classInfo.id}
                    className={`border-2 rounded-lg p-3 ${getClassColor(classInfo.title)} hover:shadow-md transition cursor-pointer`}
                    title={classInfo.description}
                  >
                    <div className="font-bold text-sm text-gray-800 mb-1">
                      {formatTime(classInfo.start_time)} - {formatTime(classInfo.end_time)}
                    </div>
                    <div className="font-semibold text-gray-900 mb-1 text-sm">
                      {classInfo.title}
                    </div>
                    {classInfo.description && (
                      <div className="text-xs text-gray-600 line-clamp-2">
                        {classInfo.description}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-center py-8 text-sm">
                  No classes scheduled
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
        <h3 className="font-bold text-lg mb-2">📋 Important Information</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Please arrive 10 minutes early for your first class</li>
          <li>• Bring water and wear comfortable workout clothing</li>
          <li>• Contact us to book a free trial class</li>
          <li>• Private lessons available - enquire at reception</li>
        </ul>
      </div>
    </div>
  );
}

export default Schedule;
import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      
      // Get first and last day of current month
      const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
      const { data, error } = await supabase
        .from('full_calendar') // Replace with your actual table name
        .select('*')
        .gte('date', firstDay.toISOString())
        .lte('date', lastDay.toISOString())
        .order('date', { ascending: true })
        .order('start_time', { ascending: true });

      if (error) throw error;

      setEvents(data || []);
      
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => {
      const eventDate = new Date(event.date).toISOString().split('T')[0];
      return eventDate === dateStr;
    });
  };

    // Generate calendar days
    const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get day of week (0 = Sunday, 1 = Monday, etc.)
    let startingDayOfWeek = firstDay.getDay();
    
    // Convert Sunday (0) to 6, and shift everything else down by 1
    // So Monday becomes 0, Tuesday becomes 1, ..., Sunday becomes 6
    startingDayOfWeek = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
    
    const totalDays = lastDay.getDate();
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
    }
    
    // Add all days in month
    for (let day = 1; day <= totalDays; day++) {
        days.push(new Date(year, month, day));
    }
    
    return days;
    };

  const formatTime = (time) => {
    if (!time) return '';
    return time.substring(0, 5);
  };

  const getClassColor = (className) => {
    const nameLower = className.toLowerCase();
    if (nameLower.includes('little lions')) {
      return 'bg-green-500';
    } else if (nameLower.includes('junior')) {
      return 'bg-yellow-500';
    } else if (nameLower.includes('adult')) {
      return 'bg-red-500';
    } else if (nameLower.includes('tournament') || nameLower.includes('weapons')) {
      return 'bg-purple-500';
    }
    return 'bg-blue-500';
  };

  const changeMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const calendarDays = generateCalendarDays();

  if (loading && events.length === 0) {
    return (
      <div className="bg-[#2e2e2e] min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white text-2xl">Loading calendar...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#2e2e2e] min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h1 className="text-5xl font-black text-white mb-4">Class Calendar</h1>
          <div className="w-24 h-1 bg-[#ff6d00] mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">View all upcoming classes and events</p>
        </div>

        {/* Calendar Controls */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 mb-8 flex justify-between items-center">
          <button 
            onClick={() => changeMonth(-1)}
            className="bg-[#ff6d00] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#e66200] transition"
          >
            ← Previous
          </button>
          
          <h2 className="text-3xl font-black text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          
          <button 
            onClick={() => changeMonth(1)}
            className="bg-[#ff6d00] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#e66200] transition"
          >
            Next →
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-2xl border-2 border-[#3d3d3d]">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map(day => (
              <div key={day} className="text-center font-bold text-[#ff6d00] py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="aspect-square"></div>;
              }

              const dayEvents = getEventsForDate(day);
              const isToday = day.toDateString() === new Date().toDateString();
              const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();

              return (
                <div
                  key={index}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    aspect-square p-2 rounded-lg cursor-pointer transition-all duration-300
                    ${isToday ? 'ring-2 ring-[#ff6d00]' : ''}
                    ${isSelected ? 'bg-[#ff6d00]' : 'bg-[#2e2e2e] hover:bg-[#3d3d3d]'}
                    ${dayEvents.length > 0 ? 'border-2 border-[#ff6d00]' : 'border border-[#3d3d3d]'}
                  `}
                >
                  <div className={`text-sm font-bold mb-1 ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                    {day.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event, i) => (
                      <div
                        key={i}
                        className={`${getClassColor(event.class_name)} text-white text-xs px-1 rounded truncate`}
                        title={`${event.class_name} - ${formatTime(event.start_time)}`}
                      >
                        {formatTime(event.start_time)}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-400">+{dayEvents.length - 3}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <div className="mt-8 bg-[#1a1a1a] rounded-2xl p-8 border-2 border-[#ff6d00]">
            <h3 className="text-3xl font-black text-white mb-6">
              Classes on {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h3>
            
            {getEventsForDate(selectedDate).length > 0 ? (
              <div className="space-y-4">
                {getEventsForDate(selectedDate).map((event) => (
                  <div 
                    key={event.class_id + event.start_time}
                    className="bg-[#2e2e2e] p-6 rounded-xl border-l-4 border-[#ff6d00] hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">{event.class_name}</h4>
                        <p className="text-gray-400 mb-2">{event.description}</p>
                      </div>
                      <div className={`${getClassColor(event.class_name)} text-white px-4 py-2 rounded-lg font-bold`}>
                        {formatTime(event.start_time)} - {formatTime(event.end_time)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-lg">No classes scheduled for this day.</p>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 bg-[#1a1a1a] rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Class Types</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              <span className="text-gray-300">Little Lions</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
              <span className="text-gray-300">Junior Classes</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
              <span className="text-gray-300">Adult Classes</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
              <span className="text-gray-300">Special Classes</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
              <span className="text-gray-300">All Ages</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
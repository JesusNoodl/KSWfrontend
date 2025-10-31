function Schedule() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-8">Class Schedule</h1>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Day</th>
              <th className="px-6 py-3 text-left">Time</th>
              <th className="px-6 py-3 text-left">Class</th>
              <th className="px-6 py-3 text-left">Instructor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4">Monday</td>
              <td className="px-6 py-4">6:00 PM - 7:00 PM</td>
              <td className="px-6 py-4">Kids Beginner</td>
              <td className="px-6 py-4">Master Lee</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4">Monday</td>
              <td className="px-6 py-4">7:30 PM - 8:30 PM</td>
              <td className="px-6 py-4">Adult Advanced</td>
              <td className="px-6 py-4">Master Kim</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4">Wednesday</td>
              <td className="px-6 py-4">6:00 PM - 7:00 PM</td>
              <td className="px-6 py-4">Kids Intermediate</td>
              <td className="px-6 py-4">Master Lee</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4">Friday</td>
              <td className="px-6 py-4">6:00 PM - 7:30 PM</td>
              <td className="px-6 py-4">All Levels Sparring</td>
              <td className="px-6 py-4">Master Kim</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schedule;
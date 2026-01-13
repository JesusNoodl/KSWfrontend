import { useState, useEffect } from 'react';
import { AlertCircle, Search, Users, Filter } from 'lucide-react';
import { getAllStudents } from '../../utils/api';

function AdminStudentsList() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all, active, inactive

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, activeFilter]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getAllStudents();
      setStudents(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterStudents = () => {
    let filtered = [...students];

    // Apply active/inactive filter
    if (activeFilter === 'active') {
      filtered = filtered.filter(student => student.active === true);
    } else if (activeFilter === 'inactive') {
      filtered = filtered.filter(student => student.active === false);
    }

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(student => 
        student.first_name?.toLowerCase().includes(search) ||
        student.last_name?.toLowerCase().includes(search) ||
        student.student_id?.toLowerCase().includes(search) ||
        student.black_belt_id?.toLowerCase().includes(search)
      );
    }

    setFilteredStudents(filtered);
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

  const calculateAge = (dateString) => {
    if (!dateString) return 'N/A';
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
        <div className="text-center text-white text-xl">Loading students...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="text-red-500" size={24} />
          <h2 className="text-xl font-bold text-red-500">Error Loading Students</h2>
        </div>
        <p className="text-gray-400">{error}</p>
        <button
          onClick={fetchStudents}
          className="mt-4 px-6 py-2 bg-[#ff6d00] text-white rounded-lg hover:bg-[#e66200] transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-6 border-2 border-[#3d3d3d]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Users className="text-[#ff6d00]" size={32} />
            <div>
              <h2 className="text-3xl font-black text-white">Student Management</h2>
              <p className="text-gray-400">View and manage all students</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Total Students</p>
            <p className="text-3xl font-black text-[#ff6d00]">{students.length}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search by name or student ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white placeholder-gray-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
                activeFilter === 'all'
                  ? 'bg-[#ff6d00] text-white'
                  : 'bg-[#2e2e2e] text-gray-300 hover:bg-[#3d3d3d]'
              }`}
            >
              <Filter size={16} />
              All ({students.length})
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-4 py-3 rounded-lg font-semibold transition ${
                activeFilter === 'active'
                  ? 'bg-[#ff6d00] text-white'
                  : 'bg-[#2e2e2e] text-gray-300 hover:bg-[#3d3d3d]'
              }`}
            >
              Active ({students.filter(s => s.active).length})
            </button>
            <button
              onClick={() => setActiveFilter('inactive')}
              className={`px-4 py-3 rounded-lg font-semibold transition ${
                activeFilter === 'inactive'
                  ? 'bg-[#ff6d00] text-white'
                  : 'bg-[#2e2e2e] text-gray-300 hover:bg-[#3d3d3d]'
              }`}
            >
              Inactive ({students.filter(s => !s.active).length})
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-gray-400 text-sm">
          Showing {filteredStudents.length} of {students.length} students
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl border-2 border-[#3d3d3d] overflow-hidden">
        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="mx-auto text-gray-600 mb-4" size={64} />
            <p className="text-gray-400 text-lg">No students found matching your criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#2e2e2e]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#ff6d00] uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#ff6d00] uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#ff6d00] uppercase tracking-wider">
                    Date of Birth
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#ff6d00] uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#ff6d00] uppercase tracking-wider">
                    Belt Level
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#ff6d00] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#ff6d00] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3d3d3d]">
                {filteredStudents.map((student) => (
                  <tr 
                    key={student.id}
                    className="hover:bg-[#2e2e2e] transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-white font-mono text-sm">
                        {student.student_id || student.black_belt_id || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-white font-semibold">
                        {student.first_name} {student.last_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-300">
                        {formatDate(student.dob)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-300">
                        {calculateAge(student.dob)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#ff6d00] text-white">
                        Belt ID: {student.belt_level_id || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        student.active 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-500 text-white'
                      }`}>
                        {student.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-[#ff6d00] hover:text-[#e66200] font-semibold text-sm"
                        onClick={() => {
                          // TODO: Navigate to student detail page
                          console.log('View student:', student.id);
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1a1a1a] rounded-xl p-6 border-2 border-[#3d3d3d]">
          <p className="text-gray-400 text-sm mb-2">Active Students</p>
          <p className="text-3xl font-black text-green-500">
            {students.filter(s => s.active).length}
          </p>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-6 border-2 border-[#3d3d3d]">
          <p className="text-gray-400 text-sm mb-2">Inactive Students</p>
          <p className="text-3xl font-black text-gray-500">
            {students.filter(s => !s.active).length}
          </p>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-6 border-2 border-[#3d3d3d]">
          <p className="text-gray-400 text-sm mb-2">With Student ID</p>
          <p className="text-3xl font-black text-[#ff6d00]">
            {students.filter(s => s.student_id).length}
          </p>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-6 border-2 border-[#3d3d3d]">
          <p className="text-gray-400 text-sm mb-2">Black Belts</p>
          <p className="text-3xl font-black text-yellow-500">
            {students.filter(s => s.black_belt_id).length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminStudentsList;
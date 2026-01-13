import { useState, useEffect } from 'react';
import { AlertCircle, Search, Users, Filter, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllStudents, getAllBelts } from '../../utils/api';

function AdminStudentsList() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [belts, setBelts] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 20;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortStudents();
  }, [students, searchTerm, activeFilter, sortConfig]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [studentsData, beltsData] = await Promise.all([
        getAllStudents(),
        getAllBelts()
      ]);
      
      setStudents(studentsData || []);
      setBelts(beltsData || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getBeltName = (beltLevelId) => {
    if (!beltLevelId) return 'Not Set';
    const belt = belts.find(b => b.id === beltLevelId);
    return belt ? belt.name : `Belt ID: ${beltLevelId}`;
  };

  const getBeltColor = (beltLevelId) => {
    if (!beltLevelId) return '#6b7280';
    const belt = belts.find(b => b.id === beltLevelId);
    return belt?.color || '#6b7280';
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page when sorting
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronsUpDown size={16} className="text-gray-500" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp size={16} className="text-[#ff6d00]" />
      : <ChevronDown size={16} className="text-[#ff6d00]" />;
  };

  const filterAndSortStudents = () => {
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

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue, bValue;

        switch (sortConfig.key) {
          case 'name':
            aValue = `${a.first_name} ${a.last_name}`.toLowerCase();
            bValue = `${b.first_name} ${b.last_name}`.toLowerCase();
            break;
          case 'studentId':
            aValue = a.student_id || a.black_belt_id || '';
            bValue = b.student_id || b.black_belt_id || '';
            break;
          case 'dob':
            aValue = a.dob ? new Date(a.dob).getTime() : 0;
            bValue = b.dob ? new Date(b.dob).getTime() : 0;
            break;
          case 'age':
            aValue = a.dob ? calculateAge(a.dob) : 0;
            bValue = b.dob ? calculateAge(b.dob) : 0;
            break;
          case 'belt':
            aValue = getBeltName(a.belt_level_id).toLowerCase();
            bValue = getBeltName(b.belt_level_id).toLowerCase();
            break;
          case 'status':
            aValue = a.active ? 1 : 0;
            bValue = b.active ? 1 : 0;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
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

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          onClick={fetchData}
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
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search by name or student ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white placeholder-gray-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveFilter('all');
                setCurrentPage(1);
              }}
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
              onClick={() => {
                setActiveFilter('active');
                setCurrentPage(1);
              }}
              className={`px-4 py-3 rounded-lg font-semibold transition ${
                activeFilter === 'active'
                  ? 'bg-[#ff6d00] text-white'
                  : 'bg-[#2e2e2e] text-gray-300 hover:bg-[#3d3d3d]'
              }`}
            >
              Active ({students.filter(s => s.active).length})
            </button>
            <button
              onClick={() => {
                setActiveFilter('inactive');
                setCurrentPage(1);
              }}
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

        <div className="mt-4 text-gray-400 text-sm">
          Showing {indexOfFirstStudent + 1}-{Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length} students
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
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#2e2e2e]">
                  <tr>
                    <th 
                      className="px-6 py-4 text-left text-xs font-bold text-[#ff6d00] uppercase tracking-wider cursor-pointer hover:bg-[#3d3d3d] transition"
                      onClick={() => handleSort('studentId')}
                    >
                      <div className="flex items-center gap-2">
                        Student ID
                        {getSortIcon('studentId')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-bold text-[#ff6d00] uppercase tracking-wider cursor-pointer hover:bg-[#3d3d3d] transition"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-2">
                        Name
                        {getSortIcon('name')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-bold text-[#ff6d00] uppercase tracking-wider cursor-pointer hover:bg-[#3d3d3d] transition"
                      onClick={() => handleSort('dob')}
                    >
                      <div className="flex items-center gap-2">
                        Date of Birth
                        {getSortIcon('dob')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-bold text-[#ff6d00] uppercase tracking-wider cursor-pointer hover:bg-[#3d3d3d] transition"
                      onClick={() => handleSort('age')}
                    >
                      <div className="flex items-center gap-2">
                        Age
                        {getSortIcon('age')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-bold text-[#ff6d00] uppercase tracking-wider cursor-pointer hover:bg-[#3d3d3d] transition"
                      onClick={() => handleSort('belt')}
                    >
                      <div className="flex items-center gap-2">
                        Belt Level
                        {getSortIcon('belt')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-bold text-[#ff6d00] uppercase tracking-wider cursor-pointer hover:bg-[#3d3d3d] transition"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center gap-2">
                        Status
                        {getSortIcon('status')}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#ff6d00] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3d3d3d]">
                  {currentStudents.map((student) => (
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
                        <span 
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: getBeltColor(student.belt_level_id) }}
                        >
                          {getBeltName(student.belt_level_id)}
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
                          onClick={() => navigate(`/admin/students/${student.id}`)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-[#2e2e2e] px-6 py-4 flex items-center justify-between border-t-2 border-[#3d3d3d]">
                <div className="text-gray-400 text-sm">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      currentPage === 1
                        ? 'bg-[#3d3d3d] text-gray-600 cursor-not-allowed'
                        : 'bg-[#ff6d00] text-white hover:bg-[#e66200]'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {/* Page numbers */}
                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      // Show first page, last page, current page, and pages around current
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                              currentPage === pageNumber
                                ? 'bg-[#ff6d00] text-white'
                                : 'bg-[#3d3d3d] text-gray-300 hover:bg-[#4d4d4d]'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return (
                          <span key={pageNumber} className="px-2 py-2 text-gray-500">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      currentPage === totalPages
                        ? 'bg-[#3d3d3d] text-gray-600 cursor-not-allowed'
                        : 'bg-[#ff6d00] text-white hover:bg-[#e66200]'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
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
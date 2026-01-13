import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  AlertCircle, 
  ArrowLeft, 
  User, 
  Calendar, 
  Trophy, 
  MapPin,
  Edit,
  Save,
  X,
  Award
} from 'lucide-react';
import { 
  getStudent, 
  getStudentPromotions, 
  getStudentAwards,
  getAllBelts,
  updateStudent
} from '../../utils/api';

function StudentDetail() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [currentBelt, setCurrentBelt] = useState(null);
  const [promotions, setPromotions] = useState([]);
  const [awards, setAwards] = useState([]);
  const [allBelts, setAllBelts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStudentData();
  }, [studentId]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [
        studentData,
        beltsData,
        promotionsData,
        awardsData
      ] = await Promise.all([
        getStudent(studentId),
        getAllBelts(),
        getStudentPromotions(studentId).catch(() => []),
        getStudentAwards(studentId).catch(() => [])
      ]);

      setStudent(studentData);
      setEditedStudent(studentData);
      setAllBelts(beltsData || []);
      setPromotions(promotionsData || []);
      setAwards(awardsData || []);

      // Get current belt information
      if (studentData.belt_level_id) {
        const belt = beltsData.find(b => b.id === studentData.belt_level_id);
        setCurrentBelt(belt);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching student data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset to original values
      setEditedStudent({ ...student });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setEditedStudent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Call the actual API to update the student
      await updateStudent(studentId, editedStudent);
      
      setStudent(editedStudent);
      setIsEditing(false);
      
      // Update current belt if changed
      if (editedStudent.belt_level_id !== student.belt_level_id) {
        const belt = allBelts.find(b => b.id === editedStudent.belt_level_id);
        setCurrentBelt(belt);
      }
    } catch (err) {
      console.error('Error saving student:', err);
      alert('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
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

  const getBeltName = (beltLevelId) => {
    const belt = allBelts.find(b => b.id === beltLevelId);
    return belt?.name || 'Unknown Belt';
  };

  if (loading) {
    return (
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
        <div className="text-center text-white text-xl">Loading student details...</div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="text-red-500" size={24} />
          <h2 className="text-xl font-bold text-red-500">Error Loading Student</h2>
        </div>
        <p className="text-gray-400">{error || 'Student not found'}</p>
        <button
          onClick={() => navigate('/admin/students')}
          className="mt-4 px-6 py-2 bg-[#ff6d00] text-white rounded-lg hover:bg-[#e66200] transition"
        >
          Back to Students List
        </button>
      </div>
    );
  }

  const displayStudent = isEditing ? editedStudent : student;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/students')}
        className="flex items-center gap-2 text-gray-400 hover:text-[#ff6d00] transition"
      >
        <ArrowLeft size={20} />
        <span>Back to Students List</span>
      </button>

      {/* Student Header */}
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-[#ff6d00] flex items-center justify-center">
              <User size={48} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white mb-2">
                {displayStudent.first_name} {displayStudent.last_name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-gray-400 font-mono">
                  ID: {displayStudent.student_id || displayStudent.black_belt_id || 'N/A'}
                </span>
                {currentBelt && (
                  <span 
                    className="px-4 py-1 rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: currentBelt.color }}
                  >
                    {currentBelt.name}
                  </span>
                )}
                <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                  displayStudent.active 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-500 text-white'
                }`}>
                  {displayStudent.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* Edit/Save/Cancel Buttons */}
          <div className="flex gap-2">
            {!isEditing ? (
              <button
                onClick={handleEditToggle}
                className="px-6 py-3 bg-[#ff6d00] text-white rounded-lg hover:bg-[#e66200] transition font-semibold flex items-center gap-2"
              >
                <Edit size={20} />
                Edit Student
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={20} />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={handleEditToggle}
                  disabled={saving}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold flex items-center gap-2 disabled:opacity-50"
                >
                  <X size={20} />
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Personal Information - Editable */}
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-6 border-2 border-[#3d3d3d]">
        <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
          <User className="text-[#ff6d00]" size={24} />
          Personal Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">First Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editedStudent.first_name}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
                className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white"
              />
            ) : (
              <p className="text-white font-semibold text-lg">{displayStudent.first_name}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editedStudent.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white"
              />
            ) : (
              <p className="text-white font-semibold text-lg">{displayStudent.last_name}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                value={formatDateForInput(editedStudent.dob)}
                onChange={(e) => handleInputChange('dob', e.target.value)}
                className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white"
              />
            ) : (
              <p className="text-white font-semibold text-lg">{formatDate(displayStudent.dob)}</p>
            )}
          </div>

          {/* Age (calculated, not editable) */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Age</label>
            <p className="text-white font-semibold text-lg">{calculateAge(displayStudent.dob)} years old</p>
          </div>

          {/* Student ID */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Student ID</label>
            {isEditing ? (
              <input
                type="text"
                value={editedStudent.student_id || ''}
                onChange={(e) => handleInputChange('student_id', e.target.value)}
                className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white font-mono"
              />
            ) : (
              <p className="text-white font-semibold text-lg font-mono">{displayStudent.student_id || 'N/A'}</p>
            )}
          </div>

          {/* Black Belt ID */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Black Belt ID</label>
            {isEditing ? (
              <input
                type="text"
                value={editedStudent.black_belt_id || ''}
                onChange={(e) => handleInputChange('black_belt_id', e.target.value)}
                className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white font-mono"
              />
            ) : (
              <p className="text-white font-semibold text-lg font-mono">{displayStudent.black_belt_id || 'N/A'}</p>
            )}
          </div>

          {/* Belt Level */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Current Belt Level</label>
            {isEditing ? (
              <select
                value={editedStudent.belt_level_id || ''}
                onChange={(e) => handleInputChange('belt_level_id', parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white"
              >
                <option value="">Select Belt</option>
                {allBelts.map(belt => (
                  <option key={belt.id} value={belt.id}>{belt.name}</option>
                ))}
              </select>
            ) : (
              <p className="text-white font-semibold text-lg">{getBeltName(displayStudent.belt_level_id)}</p>
            )}
          </div>

          {/* Active Status */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Status</label>
            {isEditing ? (
              <select
                value={editedStudent.active ? 'true' : 'false'}
                onChange={(e) => handleInputChange('active', e.target.value === 'true')}
                className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            ) : (
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                displayStudent.active 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-500 text-white'
              }`}>
                {displayStudent.active ? 'Active' : 'Inactive'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Address Information - Editable */}
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-6 border-2 border-[#3d3d3d]">
        <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
          <MapPin className="text-[#ff6d00]" size={24} />
          Address
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address Line 1 */}
          <div className="md:col-span-2">
            <label className="block text-gray-400 text-sm mb-2">Address Line 1</label>
            {isEditing ? (
              <input
                type="text"
                value={editedStudent.address_line_1 || ''}
                onChange={(e) => handleInputChange('address_line_1', e.target.value)}
                className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white"
              />
            ) : (
              <p className="text-white font-semibold text-lg">{displayStudent.address_line_1 || 'N/A'}</p>
            )}
          </div>

          {/* Address Line 2 */}
          <div className="md:col-span-2">
            <label className="block text-gray-400 text-sm mb-2">Address Line 2</label>
            {isEditing ? (
              <input
                type="text"
                value={editedStudent.address_line_2 || ''}
                onChange={(e) => handleInputChange('address_line_2', e.target.value)}
                className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white"
              />
            ) : (
              <p className="text-white font-semibold text-lg">{displayStudent.address_line_2 || 'N/A'}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">City</label>
            {isEditing ? (
              <input
                type="text"
                value={editedStudent.city || ''}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white"
              />
            ) : (
              <p className="text-white font-semibold text-lg">{displayStudent.city || 'N/A'}</p>
            )}
          </div>

          {/* Postcode */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Postcode</label>
            {isEditing ? (
              <input
                type="text"
                value={editedStudent.postcode || ''}
                onChange={(e) => handleInputChange('postcode', e.target.value.toUpperCase())}
                className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white"
              />
            ) : (
              <p className="text-white font-semibold text-lg">{displayStudent.postcode || 'N/A'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Promotion History (View Only) */}
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-6 border-2 border-[#3d3d3d]">
        <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
          <Trophy className="text-[#ff6d00]" size={24} />
          Promotion History
        </h2>
        {promotions.length === 0 ? (
          <p className="text-gray-400">No promotion history available</p>
        ) : (
          <div className="space-y-3">
            {promotions
              .sort((a, b) => new Date(b.promotion_date) - new Date(a.promotion_date))
              .map((promotion) => (
                <div 
                  key={promotion.id}
                  className="bg-[#2e2e2e] rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#ff6d00] flex items-center justify-center">
                      <Trophy className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        Promoted to {getBeltName(promotion.new_belt_level_id)}
                      </p>
                      <p className="text-gray-400 text-sm">
                        From {getBeltName(promotion.old_belt_level_id)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#ff6d00] font-semibold">
                      {formatDate(promotion.promotion_date)}
                    </p>
                    {promotion.graded_by && (
                      <p className="text-gray-400 text-sm">
                        Graded by: {promotion.graded_by}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Awards (View Only) */}
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-6 border-2 border-[#3d3d3d]">
        <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
          <Award className="text-[#ff6d00]" size={24} />
          Awards & Achievements
        </h2>
        {awards.length === 0 ? (
          <p className="text-gray-400">No awards recorded</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {awards
              .sort((a, b) => new Date(b.date_awarded) - new Date(a.date_awarded))
              .map((award) => (
                <div 
                  key={award.id}
                  className="bg-[#2e2e2e] rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <Award className="text-[#ff6d00] flex-shrink-0" size={24} />
                    <div>
                      <p className="text-white font-semibold mb-1">
                        {award.award_name || 'Award'}
                      </p>
                      <p className="text-gray-400 text-sm mb-2">
                        {formatDate(award.date_awarded)}
                      </p>
                      {award.notes && (
                        <p className="text-gray-300 text-sm">
                          {award.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDetail;
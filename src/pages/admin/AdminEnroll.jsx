import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { enrolStudent, getAgeCategories } from '../../api/api';

export default function EnrolStudent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [ageCategories, setAgeCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    dob: '',
    age_category_id: ''
  });

  // Fetch age categories when component mounts
  useEffect(() => {
    async function fetchAgeCategories() {
      try {
        const categories = await getAgeCategories();
        console.log('Loaded age categories:', categories);
        setAgeCategories(categories);
      } catch (err) {
        setError('Failed to load age categories');
        console.error(err);
      }
    }
    
    fetchAgeCategories();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleCategorySelect = (categoryId, categoryName) => {
    setFormData(prev => ({
      ...prev,
      age_category_id: categoryId
    }));
    setIsDropdownOpen(false);
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const getSelectedCategoryName = () => {
    const selected = ageCategories.find(cat => cat.id === formData.age_category_id);
    return selected ? selected.name : 'Select age category';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validate that an age category is selected
    if (!formData.age_category_id) {
      setError('Please select an age category');
      setLoading(false);
      return;
    }

    try {
      const submissionData = {
        ...formData,
        dob: new Date(formData.dob).toISOString(),
        age_category_id: parseInt(formData.age_category_id)
      };

      await enrolStudent(submissionData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        first_name: '',
        last_name: '',
        dob: '',
        age_category_id: ''
      });
      
    } catch (err) {
      setError(err.message);
      console.error('Enrolment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2e2e2e] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Enrol New Student</h1>
        
        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-900/50 border border-green-500 rounded-lg">
            <p className="text-green-200">Student enrolled successfully!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-[#1a1a1a] rounded-lg p-6 shadow-lg">
          {/* First Name */}
          <div className="mb-6">
            <label htmlFor="first_name" className="block text-white mb-2 font-medium">
              First Name <span className="text-[#ff6d00]">*</span>
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#2e2e2e] text-white rounded-lg border border-gray-600 focus:border-[#ff6d00] focus:outline-none"
              placeholder="Enter first name"
            />
          </div>

          {/* Last Name */}
          <div className="mb-6">
            <label htmlFor="last_name" className="block text-white mb-2 font-medium">
              Last Name <span className="text-[#ff6d00]">*</span>
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#2e2e2e] text-white rounded-lg border border-gray-600 focus:border-[#ff6d00] focus:outline-none"
              placeholder="Enter last name"
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-6">
            <label htmlFor="dob" className="block text-white mb-2 font-medium">
              Date of Birth <span className="text-[#ff6d00]">*</span>
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#2e2e2e] text-white rounded-lg border border-gray-600 focus:border-[#ff6d00] focus:outline-none"
            />
          </div>

          {/* Age Category - Custom Dropdown */}
          <div className="mb-6" ref={dropdownRef}>
            <label className="block text-white mb-2 font-medium">
              Age Category <span className="text-[#ff6d00]">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-2 bg-[#2e2e2e] text-white rounded-lg border border-gray-600 focus:border-[#ff6d00] focus:outline-none text-left flex justify-between items-center"
              >
                <span className={formData.age_category_id ? 'text-white' : 'text-gray-400'}>
                  {getSelectedCategoryName()}
                </span>
                <svg 
                  className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-[#2e2e2e] border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {ageCategories.map(category => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleCategorySelect(category.id, category.name)}
                      className="w-full px-4 py-2 text-left text-white hover:bg-[#ff6d00] transition-colors"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#ff6d00] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#e66300] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enrolling...' : 'Enrol Student'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/admin/students')}
              className="px-6 py-3 bg-[#2e2e2e] text-white rounded-lg border border-gray-600 hover:border-[#ff6d00] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
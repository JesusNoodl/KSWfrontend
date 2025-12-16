// src/pages/MemberContacts.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  getMyContacts, 
  createContact, 
  updateContact, 
  deleteContact 
} from '../../utils/api';

const MemberContacts = () => {
  const { user, loading: authLoading } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    is_primary: false,
    primary_phone_number: '',
    relation: '',
    country_calling_code: '+44',
    email: '',
    secondary_phone_number: '',
    house_number: '',
    street_name: '',
    house_name: '',
    postcode: '',
    city: ''
  });

  useEffect(() => {
    if (user && !authLoading) {
      fetchContacts();
    }
  }, [user, authLoading]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await getMyContacts();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      is_primary: false,
      primary_phone_number: '',
      relation: '',
      country_calling_code: '+44',
      email: '',
      secondary_phone_number: '',
      house_number: '',
      street_name: '',
      house_name: '',
      postcode: '',
      city: ''
    });
    setEditingContact(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submitData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        is_primary: formData.is_primary,
        primary_phone_number: parseInt(formData.primary_phone_number),
        relation: formData.relation,
        user_id: user.id,
        country_calling_code: formData.country_calling_code,
        email: formData.email || null,
        secondary_phone_number: formData.secondary_phone_number ? parseInt(formData.secondary_phone_number) : null,
        house_number: formData.house_number ? parseInt(formData.house_number) : null,
        street_name: formData.street_name || null,
        house_name: formData.house_name || null,
        postcode: formData.postcode || null,
        city: formData.city || null
      };

      if (editingContact) {
        await updateContact(editingContact.id, submitData);
      } else {
        await createContact(submitData);
      }

      await fetchContacts();
      resetForm();
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error saving contact:', err);
    }
  };

  const handleEdit = (contact) => {
    setFormData({
      first_name: contact.first_name,
      last_name: contact.last_name,
      is_primary: contact.is_primary,
      primary_phone_number: contact.primary_phone_number.toString(),
      relation: contact.relation,
      country_calling_code: contact.country_calling_code,
      email: contact.email || '',
      secondary_phone_number: contact.secondary_phone_number ? contact.secondary_phone_number.toString() : '',
      house_number: contact.house_number ? contact.house_number.toString() : '',
      street_name: contact.street_name || '',
      house_name: contact.house_name || '',
      postcode: contact.postcode || '',
      city: contact.city || ''
    });
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDelete = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      await deleteContact(contactId);
      await fetchContacts();
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error deleting contact:', err);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
        <div className="text-center text-white text-xl">Loading contacts...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
        <div className="bg-red-900 border-2 border-red-500 text-red-200 px-6 py-4 rounded-xl">
          Please log in to view your contacts.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-6 border-2 border-[#3d3d3d]">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="text-3xl font-black text-white mb-2">My Contacts</h2>
            <p className="text-gray-400">Manage your emergency contacts and family members</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              showForm 
                ? 'bg-[#2e2e2e] text-gray-300 hover:bg-[#3d3d3d]' 
                : 'bg-[#ff6d00] text-white hover:bg-[#e66200]'
            }`}
          >
            {showForm ? 'Cancel' : '+ Add New Contact'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900 border-2 border-red-500 text-red-200 px-6 py-4 rounded-xl">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Contact Form */}
      {showForm && (
        <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
          <h3 className="text-2xl font-black text-[#ff6d00] mb-6">
            {editingContact ? 'Edit Contact' : 'Add New Contact'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg text-white focus:border-[#ff6d00] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg text-white focus:border-[#ff6d00] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Relation & Primary Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">
                  Relation <span className="text-red-500">*</span>
                </label>
                <select
                  name="relation"
                  value={formData.relation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg text-white focus:border-[#ff6d00] focus:outline-none transition-colors"
                >
                  <option value="">Select relation</option>
                  <option value="Parent">Parent</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Emergency Contact">Emergency Contact</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer mt-8">
                  <input
                    type="checkbox"
                    name="is_primary"
                    checked={formData.is_primary}
                    onChange={handleInputChange}
                    className="w-5 h-5 accent-[#ff6d00] cursor-pointer"
                  />
                  <span className="text-gray-300 font-semibold">Primary Contact</span>
                </label>
              </div>
            </div>

            {/* Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">
                  Country Code <span className="text-red-500">*</span>
                </label>
                <select
                  name="country_calling_code"
                  value={formData.country_calling_code}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg text-white focus:border-[#ff6d00] focus:outline-none transition-colors"
                >
                  <option value="+44">+44 (UK)</option>
                  <option value="+1">+1 (US/Canada)</option>
                  <option value="+353">+353 (Ireland)</option>
                  <option value="+61">+61 (Australia)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">
                  Primary Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="primary_phone_number"
                  value={formData.primary_phone_number}
                  onChange={handleInputChange}
                  placeholder="7123456789"
                  required
                  className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg text-white placeholder-gray-500 focus:border-[#ff6d00] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Secondary Phone & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">
                  Secondary Phone
                </label>
                <input
                  type="tel"
                  name="secondary_phone_number"
                  value={formData.secondary_phone_number}
                  onChange={handleInputChange}
                  placeholder="7987654321"
                  className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg text-white placeholder-gray-500 focus:border-[#ff6d00] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="contact@example.com"
                  className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg text-white placeholder-gray-500 focus:border-[#ff6d00] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="border-t border-[#3d3d3d] pt-6 mt-2">
              <h4 className="text-lg font-bold text-[#ff6d00] mb-4">Address (Optional)</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">
                    House Number
                  </label>
                  <input
                    type="number"
                    name="house_number"
                    value={formData.house_number}
                    onChange={handleInputChange}
                    placeholder="e.g. 42"
                    className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg text-white placeholder-gray-500 focus:border-[#ff6d00] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">
                    House Name
                  </label>
                  <input
                    type="text"
                    name="house_name"
                    value={formData.house_name}
                    onChange={handleInputChange}
                    placeholder="e.g. Rose Cottage"
                    className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg text-white placeholder-gray-500 focus:border-[#ff6d00] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2 font-semibold">
                  Street Name
                </label>
                <input
                  type="text"
                  name="street_name"
                  value={formData.street_name}
                  onChange={handleInputChange}
                  placeholder="e.g. High Street"
                  className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg text-white placeholder-gray-500 focus:border-[#ff6d00] focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">
                    Post Code
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    placeholder="e.g. NR20 1AB"
                    className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg text-white placeholder-gray-500 focus:border-[#ff6d00] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Norwich"
                    className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg text-white placeholder-gray-500 focus:border-[#ff6d00] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="submit"
                className="px-8 py-3 bg-[#ff6d00] text-white font-bold rounded-lg hover:bg-[#e66200] transition-all duration-300"
              >
                {editingContact ? 'Update Contact' : 'Add Contact'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-3 bg-[#2e2e2e] text-gray-300 font-bold rounded-lg hover:bg-[#3d3d3d] transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Contacts Grid */}
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
        <h3 className="text-2xl font-black text-white mb-6">Your Contacts</h3>
        
        {contacts.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No contacts found. Add your first contact to get started.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {contacts.map(contact => (
              <div
                key={contact.id}
                className="bg-[#2e2e2e] rounded-xl p-6 border-l-4 border-[#ff6d00] hover:bg-[#3d3d3d] transition-all duration-300"
              >
                {/* Contact Header */}
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-white font-bold text-lg">
                    {contact.first_name} {contact.last_name}
                  </h4>
                  {contact.is_primary && (
                    <span className="bg-gradient-to-r from-[#ff6d00] to-[#e66200] text-white px-3 py-1 rounded-lg text-xs font-bold uppercase">
                      Primary
                    </span>
                  )}
                </div>

                {/* Contact Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2">
                    <span className="text-[#ff6d00] font-semibold min-w-[80px]">Relation:</span>
                    <span className="text-gray-300">{contact.relation}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#ff6d00] font-semibold min-w-[80px]">Phone:</span>
                    <span className="text-gray-300">{contact.country_calling_code} {contact.primary_phone_number}</span>
                  </div>
                  {contact.secondary_phone_number && (
                    <div className="flex gap-2">
                      <span className="text-[#ff6d00] font-semibold min-w-[80px]">Secondary:</span>
                      <span className="text-gray-300">{contact.country_calling_code} {contact.secondary_phone_number}</span>
                    </div>
                  )}
                  {contact.email && (
                    <div className="flex gap-2">
                      <span className="text-[#ff6d00] font-semibold min-w-[80px]">Email:</span>
                      <span className="text-gray-300 break-all">{contact.email}</span>
                    </div>
                  )}
                  {(contact.house_number || contact.house_name || contact.street_name || contact.city || contact.postcode) && (
                    <div className="flex gap-2">
                      <span className="text-[#ff6d00] font-semibold min-w-[80px]">Address:</span>
                      <span className="text-gray-300">
                        {[
                          contact.house_name,
                          contact.house_number,
                          contact.street_name,
                          contact.city,
                          contact.postcode
                        ].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-[#3d3d3d]">
                  <button
                    onClick={() => handleEdit(contact)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberContacts;
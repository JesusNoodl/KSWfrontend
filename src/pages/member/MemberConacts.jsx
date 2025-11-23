// src/pages/MemberContacts.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { 
  getMyContacts, 
  createContact, 
  updateContact, 
  deleteContact 
} from '../../utils/api';
import '../../App.css';

const MemberContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [userId, setUserId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    is_primary: false,
    primary_phone_number: '',
    relation: '',
    address_id: '',
    country_calling_code: '+44',
    email: '',
    secondary_phone_number: ''
  });

  // Get current user ID
  useEffect(() => {
    const fetchUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUserId();
  }, []);

  // Fetch contacts
  useEffect(() => {
    if (userId) {
      fetchContacts();
    }
  }, [userId]);

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
      address_id: '',
      country_calling_code: '+44',
      email: '',
      secondary_phone_number: ''
    });
    setEditingContact(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare data - convert phone numbers to integers and handle null values
      const submitData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        is_primary: formData.is_primary,
        primary_phone_number: parseInt(formData.primary_phone_number),
        relation: formData.relation,
        address_id: parseInt(formData.address_id),
        user_id: userId,
        country_calling_code: formData.country_calling_code,
        email: formData.email || null,
        secondary_phone_number: formData.secondary_phone_number ? parseInt(formData.secondary_phone_number) : null,
      };

      if (editingContact) {
        // Update existing contact
        await updateContact(editingContact.id, submitData);
      } else {
        // Create new contact
        await createContact(submitData);
      }

      // Refresh contacts list
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
      address_id: contact.address_id.toString(),
      country_calling_code: contact.country_calling_code,
      email: contact.email || '',
      secondary_phone_number: contact.secondary_phone_number ? contact.secondary_phone_number.toString() : ''
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
      // Refresh contacts list
      await fetchContacts();
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error deleting contact:', err);
    }
  };

  if (loading) {
    return (
      <div className="member-container">
        <div className="loading">Loading contacts...</div>
      </div>
    );
  }

  return (
    <div className="member-container">
      <div className="member-header">
        <h1>My Contacts</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Contact'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Contact Form */}
      {showForm && (
        <div className="form-container">
          <h2>{editingContact ? 'Edit Contact' : 'Add New Contact'}</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first_name">First Name *</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="last_name">Last Name *</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="relation">Relation *</label>
                <select
                  id="relation"
                  name="relation"
                  value={formData.relation}
                  onChange={handleInputChange}
                  required
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

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="is_primary"
                    checked={formData.is_primary}
                    onChange={handleInputChange}
                  />
                  Primary Contact
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="country_calling_code">Country Code *</label>
                <select
                  id="country_calling_code"
                  name="country_calling_code"
                  value={formData.country_calling_code}
                  onChange={handleInputChange}
                  required
                >
                  <option value="+44">+44 (UK)</option>
                  <option value="+1">+1 (US/Canada)</option>
                  <option value="+353">+353 (Ireland)</option>
                  <option value="+61">+61 (Australia)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="primary_phone_number">Primary Phone *</label>
                <input
                  type="tel"
                  id="primary_phone_number"
                  name="primary_phone_number"
                  value={formData.primary_phone_number}
                  onChange={handleInputChange}
                  placeholder="7123456789"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="secondary_phone_number">Secondary Phone</label>
                <input
                  type="tel"
                  id="secondary_phone_number"
                  name="secondary_phone_number"
                  value={formData.secondary_phone_number}
                  onChange={handleInputChange}
                  placeholder="7987654321"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="contact@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address_id">Address ID *</label>
              <input
                type="number"
                id="address_id"
                name="address_id"
                value={formData.address_id}
                onChange={handleInputChange}
                required
              />
              <small>Enter the address ID for this contact</small>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingContact ? 'Update Contact' : 'Add Contact'}
              </button>
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Contacts List */}
      <div className="contacts-grid">
        {contacts.length === 0 ? (
          <div className="no-data">
            <p>No contacts found. Add your first contact to get started.</p>
          </div>
        ) : (
          contacts.map(contact => (
            <div key={contact.id} className="contact-card">
              <div className="contact-header">
                <h3>{contact.first_name} {contact.last_name}</h3>
                {contact.is_primary && (
                  <span className="primary-badge">Primary</span>
                )}
              </div>
              
              <div className="contact-details">
                <div className="detail-row">
                  <span className="detail-label">Relation:</span>
                  <span>{contact.relation}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span>{contact.country_calling_code} {contact.primary_phone_number}</span>
                </div>
                
                {contact.secondary_phone_number && (
                  <div className="detail-row">
                    <span className="detail-label">Secondary:</span>
                    <span>{contact.country_calling_code} {contact.secondary_phone_number}</span>
                  </div>
                )}
                
                {contact.email && (
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span>{contact.email}</span>
                  </div>
                )}
              </div>

              <div className="contact-actions">
                <button 
                  className="btn-edit"
                  onClick={() => handleEdit(contact)}
                >
                  Edit
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(contact.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MemberContacts;
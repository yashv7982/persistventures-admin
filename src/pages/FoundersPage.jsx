import React, { useEffect, useState } from 'react';

function FoundersPage() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    description: '',
    linkedinProfile: '',
    image: '' // new field for image URL
  });

  const token = localStorage.getItem('token');

  // Fetch all founders from the backend
  const fetchFounders = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/founders');
      const data = await response.json();
      setFounders(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load founders');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFounders();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit the new founder to the backend
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/founders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error adding founder');
      } else {
        fetchFounders();
        setFormData({
          name: '',
          position: '',
          description: '',
          linkedinProfile: '',
          image: ''
        });
        setShowForm(false);
      }
    } catch (err) {
      setError('Failed to add founder');
    }
  };

  // Delete a founder
  const deleteFounder = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/founders/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchFounders();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error deleting founder');
      }
    } catch (err) {
      setError('Failed to delete founder');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
        Founders Management
      </h2>

      <button
        onClick={() => setShowForm(true)}
        style={{
          display: 'block',
          margin: '0 auto 1rem',
          padding: '0.5rem 1rem',
          borderRadius: '9999px',
          backgroundColor: '#6b46c1',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Add Founder
      </button>

      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '0.5rem'
          }}
        >
          <div style={{ marginBottom: '0.5rem' }}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.25rem',
                border: '1px solid #ccc',
                borderRadius: '0.25rem'
              }}
            />
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <label>Position:</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.25rem',
                border: '1px solid #ccc',
                borderRadius: '0.25rem'
              }}
            />
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.25rem',
                border: '1px solid #ccc',
                borderRadius: '0.25rem'
              }}
            />
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <label>LinkedIn Profile:</label>
            <input
              type="text"
              name="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.25rem',
                border: '1px solid #ccc',
                borderRadius: '0.25rem'
              }}
            />
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.25rem',
                border: '1px solid #ccc',
                borderRadius: '0.25rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#6b46c1',
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Save Founder
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                backgroundColor: '#ccc',
                color: '#000',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <p style={{ textAlign: 'center' }}>Loading founders...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

      {/* Table of Founders */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            border: '1px solid #ccc',
            marginTop: '1rem'
          }}
        >
          <thead style={{ backgroundColor: '#f8f8f8' }}>
            <tr>
              <th style={thTdStyle}>Image</th>
              <th style={thTdStyle}>Name</th>
              <th style={thTdStyle}>Position</th>
              <th style={thTdStyle}>Description</th>
              <th style={thTdStyle}>LinkedIn</th>
              <th style={thTdStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {founders.map((founder) => (
              <tr key={founder._id}>
                <td style={thTdStyle}>
                  {founder.image && (
                    <img
                      src={founder.image}
                      alt={founder.name}
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'cover',
                        borderRadius: '50%'
                      }}
                    />
                  )}
                </td>
                <td style={thTdStyle}>{founder.name}</td>
                <td style={thTdStyle}>{founder.position}</td>
                <td style={thTdStyle}>{founder.description}</td>
                <td style={thTdStyle}>
                  <a
                    href={founder.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0077b5', textDecoration: 'underline' }}
                  >
                    View Profile
                  </a>
                </td>
                <td style={thTdStyle}>
                  <button
                    onClick={() => deleteFounder(founder._id)}
                    style={{
                      backgroundColor: 'red',
                      color: '#fff',
                      padding: '4px 8px',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '4px'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {founders.length === 0 && (
              <tr>
                <td colSpan="6" style={{ ...thTdStyle, textAlign: 'center' }}>
                  No founders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Reusable style for table cells
const thTdStyle = {
  border: '1px solid #ccc',
  padding: '8px'
};

export default FoundersPage;

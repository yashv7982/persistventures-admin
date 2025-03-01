import React, { useEffect, useState } from 'react';

function CompletersPage() {
  const [completers, setCompleters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    challengerName: '',
    personName: '',
    position: '',
    linkedinProfile: '',
    description: '',
    fundingAmount: '',
    image: '' // Keep image in form
  });

  const token = localStorage.getItem('token');

  // Fetch all completers from the backend
  const fetchCompleters = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/completed');
      const data = await response.json();
      setCompleters(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load completers');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompleters();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the new completer to the backend
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/completed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          fundingAmount: Number(formData.fundingAmount)
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error adding completer');
      } else {
        // Refresh list
        fetchCompleters();
        // Reset form
        setFormData({
          challengerName: '',
          personName: '',
          position: '',
          linkedinProfile: '',
          description: '',
          fundingAmount: '',
          image: ''
        });
        setShowForm(false);
      }
    } catch (err) {
      setError('Failed to add completer');
    }
  };

  // Delete a completer
  const deleteCompleter = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/completed/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        // Refresh list
        fetchCompleters();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error deleting completer');
      }
    } catch (err) {
      setError('Failed to delete completer');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '1rem'
        }}
      >
        Completers Management
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
        Add Completer
      </button>

      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '0.5rem',
            maxWidth: '500px'
          }}
        >
          <div style={{ marginBottom: '0.5rem' }}>
            <label>Challenger Name:</label>
            <input
              type="text"
              name="challengerName"
              value={formData.challengerName}
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
            <label>Person Name:</label>
            <input
              type="text"
              name="personName"
              value={formData.personName}
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
            ></textarea>
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <label>Funding Amount:</label>
            <input
              type="number"
              name="fundingAmount"
              value={formData.fundingAmount}
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
              Save Completer
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

      {loading && <p style={{ textAlign: 'center' }}>Loading completers...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

      {/* Table of Completers */}
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
              <th style={thTdStyle}>Challenger Name</th>
              <th style={thTdStyle}>Person Name</th>
              <th style={thTdStyle}>Position</th>
              <th style={thTdStyle}>LinkedIn</th>
              <th style={thTdStyle}>Description</th>
              <th style={thTdStyle}>Funding</th>
              <th style={thTdStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {completers.map((completer) => (
              <tr key={completer._id}>
                <td style={thTdStyle}>
                  {completer.image && (
                    <img
                      src={completer.image}
                      alt={completer.challengerName}
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'cover',
                        borderRadius: '50%'
                      }}
                    />
                  )}
                </td>
                <td style={thTdStyle}>{completer.challengerName}</td>
                <td style={thTdStyle}>{completer.personName}</td>
                <td style={thTdStyle}>{completer.position}</td>
                <td style={thTdStyle}>
                  <a
                    href={completer.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0077b5', textDecoration: 'underline' }}
                  >
                    View Profile
                  </a>
                </td>
                <td style={thTdStyle}>{completer.description}</td>
                <td style={{ ...thTdStyle, fontWeight: 'bold' }}>
                  {completer.fundingAmount}
                </td>
                <td style={thTdStyle}>
                  <button
                    onClick={() => deleteCompleter(completer._id)}
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
            {completers.length === 0 && (
              <tr>
                <td colSpan="8" style={{ ...thTdStyle, textAlign: 'center' }}>
                  No completers found.
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

export default CompletersPage;

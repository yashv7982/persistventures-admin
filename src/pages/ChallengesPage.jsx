import React, { useEffect, useState } from 'react';

function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    logo: '',
    title: '',
    fundingAmount: '',
    description: '',
    deadline: '',
    visible: true,
  });

  const token = localStorage.getItem('token');

  // Fetch all challenges from the backend
  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/challenges');
      const data = await response.json();
      setChallenges(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load challenges');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission to add a new challenge
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/challenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          fundingAmount: Number(formData.fundingAmount),
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error adding challenge');
      } else {
        fetchChallenges();
        setFormData({
          logo: '',
          title: '',
          fundingAmount: '',
          description: '',
          deadline: '',
          visible: true,
        });
        setShowForm(false);
      }
    } catch (err) {
      setError('Failed to add challenge');
    }
  };

  // Toggle the "visible" field for a challenge
  const toggleVisibility = async (challengeId, currentVisible) => {
    try {
      const response = await fetch(`http://localhost:5000/challenges/${challengeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ visible: !currentVisible }),
      });
      if (response.ok) {
        fetchChallenges();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error toggling visibility');
      }
    } catch (err) {
      setError('Failed to update challenge visibility');
    }
  };

  // Delete a challenge
  const deleteChallenge = async (challengeId) => {
    try {
      const response = await fetch(`http://localhost:5000/challenges/${challengeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchChallenges();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error deleting challenge');
      }
    } catch (err) {
      setError('Failed to delete challenge');
    }
  };

  return (
    <div>
      <h2>Challenge Management</h2>
      <button onClick={() => setShowForm(true)}   style={{
          display: 'block',
          marginBottom: '1rem',
          margin: '0 auto 1rem',
          padding: '0.5rem 1rem',
          borderRadius: '9999px',
          backgroundColor: '#6b46c1',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }} >
        Add Challenge
      </button>
      
      {showForm && (
        <form onSubmit={handleFormSubmit} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
          <div>
            <label>Logo URL:</label>
            <input type="text" name="logo" value={formData.logo} onChange={handleChange} required />
          </div>
          <div>
            <label>Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <label>Funding Amount:</label>
            <input type="number" name="fundingAmount" value={formData.fundingAmount} onChange={handleChange} required />
          </div>
          <div>
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
          </div>
          <div>
            <label>Deadline:</label>
            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
          </div>
          <div>
            <label>Visible:</label>
            <input type="checkbox" name="visible" checked={formData.visible} onChange={handleChange} />
          </div>
          <button type="submit">Save Challenge</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}

      {loading && <p>Loading challenges...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {challenges.map((challenge) => (
          <div key={challenge._id} style={{ border: '1px solid #ccc', padding: '1rem', width: '250px' }}>
            <img src={challenge.logo} alt={challenge.title} style={{ width: '100%', height: 'auto' }} />
            <h3>{challenge.title}</h3>
            <p><strong>Funding:</strong> {challenge.fundingAmount}</p>
            <p><strong>Deadline:</strong> {new Date(challenge.deadline).toLocaleDateString()}</p>
            <p><strong>Visible:</strong> {challenge.visible ? 'Yes' : 'No'}</p>
            <button onClick={() => toggleVisibility(challenge._id, challenge.visible)} style={{ marginRight: '0.5rem' }}>
              Toggle Visibility
            </button>
            <button onClick={() => deleteChallenge(challenge._id)} style={{ backgroundColor: 'red', color: '#fff' }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChallengesPage;

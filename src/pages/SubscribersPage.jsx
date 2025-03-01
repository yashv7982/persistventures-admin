import React, { useState, useEffect } from 'react';

function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const token = localStorage.getItem('token');

  // Fetch subscribers from the backend
  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/subscribers');
      const data = await response.json();
      setSubscribers(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load subscribers');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Handle adding a new subscriber
  const handleAddSubscriber = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email: newEmail })
      });
      if (response.ok) {
        setNewEmail('');
        fetchSubscribers();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error adding subscriber');
      }
    } catch (err) {
      setError('Failed to add subscriber');
    }
  };

  // Handle deleting a subscriber
  const handleDeleteSubscriber = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/subscribers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchSubscribers();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error deleting subscriber');
      }
    } catch (err) {
      setError('Failed to delete subscriber');
    }
  };

  return (
    <div>
      <h2>Subscribers Management</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Form to add a new subscriber */}
      <form onSubmit={handleAddSubscriber} style={{ marginBottom: '1rem' }}>
        <input
          type="email"
          placeholder="Enter subscriber email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
          style={{ padding: '0.5rem', width: '250px', marginRight: '1rem' }}
        />
        <button type="submit">Add Subscriber</button>
      </form>

      {loading ? (
        <p>Loading subscribers...</p>
      ) : (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Email</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber._id}>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                  {subscriber.email}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                  <button
                    onClick={() => handleDeleteSubscriber(subscriber._id)}
                    style={{
                      backgroundColor: 'red',
                      color: '#fff',
                      border: 'none',
                      padding: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SubscribersPage;

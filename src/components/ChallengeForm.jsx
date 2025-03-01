import React, { useState } from 'react';

function ChallengeForm() {
  const [formData, setFormData] = useState({
    logo: '',
    title: '',
    fundingAmount: '',
    description: '',
    deadline: '',
    visible: true
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/challenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setMessage('Challenge created successfully!');
        setFormData({
          logo: '',
          title: '',
          fundingAmount: '',
          description: '',
          deadline: '',
          visible: true
        });
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Error creating challenge');
      }
    } catch (err) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div>
      <h3>Create New Challenge</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Logo URL:</label><br />
          <input type="text" name="logo" value={formData.logo} onChange={handleChange} required />
        </div>
        <div>
          <label>Title:</label><br />
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Funding Amount:</label><br />
          <input type="number" name="fundingAmount" value={formData.fundingAmount} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label><br />
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Deadline:</label><br />
          <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
        </div>
        <div>
          <label>Visible:</label>
          <input type="checkbox" name="visible" checked={formData.visible} onChange={handleChange} />
        </div>
        <button type="submit">Create Challenge</button>
      </form>
    </div>
  );
}

export default ChallengeForm;

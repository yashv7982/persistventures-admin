import React, { useState, useEffect } from 'react';

function ChallengeList() {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState('');

  const fetchChallenges = async () => {
    try {
      const response = await fetch('http://localhost:5000/challenges');
      const data = await response.json();
      setChallenges(data);
    } catch (err) {
      setError('Error fetching challenges');
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <div>
      <h3>Existing Challenges</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {challenges.length === 0 ? (
        <p>No challenges found.</p>
      ) : (
        <ul>
          {challenges.map(challenge => (
            <li key={challenge._id}>
              <img src={challenge.logo} alt={challenge.title} style={{ width: '50px', height: '50px' }} /><br />
              <strong>{challenge.title}</strong> - Funding: {challenge.fundingAmount} - Deadline: {new Date(challenge.deadline).toLocaleDateString()} - Visible: {challenge.visible ? 'Yes' : 'No'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ChallengeList;

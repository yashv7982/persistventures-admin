import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChallengeForm from './ChallengeForm';
import ChallengeList from './ChallengeList';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <hr />
      <ChallengeForm />
      <hr />
      <ChallengeList />
      {/* Extend here with other management components as needed */}
    </div>
  );
}

export default Dashboard;

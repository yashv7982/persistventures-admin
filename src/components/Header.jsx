import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>LOGO(IMG)</div>
      <button onClick={handleLogout} style={logoutButtonStyle}>Log Out</button>
    </header>
  );
}

// Example inline styles (you can move to a .css file)
const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#222',
  color: '#fff',
  padding: '0.5rem 1rem'
};

const logoStyle = {
  fontWeight: 'bold'
};

const logoutButtonStyle = {
  backgroundColor: '#fff',
  color: '#222',
  border: 'none',
  padding: '0.5rem 1rem',
  cursor: 'pointer'
};

export default Header;

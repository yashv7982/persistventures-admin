import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside>
      <nav>
        <ul style={navListStyle}>
          <li>
            <NavLink to="/challenges" style={linkStyle} activeStyle={activeLinkStyle}>
              Challenges
            </NavLink>
          </li>
          <li>
            <NavLink to="/completers" style={linkStyle} activeStyle={activeLinkStyle}>
              Completers
            </NavLink>
          </li>
          <li>
            <NavLink to="/founders" style={linkStyle} activeStyle={activeLinkStyle}>
              Founders
            </NavLink>
          </li>
          <li>
            <NavLink to="/subscribers" style={linkStyle} activeStyle={activeLinkStyle}>
              Subscribers
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

const navListStyle = {
  listStyle: 'none',
  padding: 0
};

const linkStyle = {
  display: 'block',
  padding: '0.5rem 0',
  color: '#333',
  textDecoration: 'none'
};

// activeStyle is used by older versions of react-router-dom (v5).
// In react-router-dom v6, you can use `className={({ isActive }) => ... }` instead.
const activeLinkStyle = {
  fontWeight: 'bold',
  color: 'blue'
};

export default Sidebar;

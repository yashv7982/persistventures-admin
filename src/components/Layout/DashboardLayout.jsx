import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import './DashboardLayout.css';

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard-content">
        <Sidebar />
        <main className="dashboard-main">
          {/* The <Outlet> renders the child route’s component (e.g., ChallengesPage) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

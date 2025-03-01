// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/Layout/DashboardLayout';
import AdminLogin from './components/AdminLogin';
import ChallengesPage from './pages/ChallengesPage';
import CompletersPage from './pages/CompletersPage';
import FoundersPage from './pages/FoundersPage';
import SubscribersPage from './pages/SubscribersPage';

function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />

        {isAuthenticated ? (
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/challenges" />} />
            <Route path="challenges" element={<ChallengesPage />} />
            <Route path="completers" element={<CompletersPage />} />
            <Route path="founders" element={<FoundersPage />} />
            <Route path="subscribers" element={<SubscribersPage />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;

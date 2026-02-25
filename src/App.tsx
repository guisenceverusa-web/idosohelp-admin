import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Financial from './pages/Financial';
import Support from './pages/Support';

function App() {
  const isAuthenticated = !!localStorage.getItem('adminToken');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/login" />} />
        <Route path="/financial" element={isAuthenticated ? <Financial /> : <Navigate to="/login" />} />
        <Route path="/support" element={isAuthenticated ? <Support /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

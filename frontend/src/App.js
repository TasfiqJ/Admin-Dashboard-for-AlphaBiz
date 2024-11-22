import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard'; // Import new Dashboard component
import Welcome from './components/Welcome'; // Welcome page for non-admin users
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  const role = localStorage.getItem('role'); // Get the user's role from localStorage

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {role === 'Admin' ? <Dashboard /> : <div>Unauthorized</div>}
            </ProtectedRoute>
          }
        />

        {/* Welcome Page for Regular Users */}
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
};

export default App;

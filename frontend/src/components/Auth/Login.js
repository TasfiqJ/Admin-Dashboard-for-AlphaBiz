import React, { useState } from 'react';
import api from '../../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/users/login', { email, password }); // Send login credentials to the backend
      localStorage.setItem('token', data.token); // Save the token to local storage
      localStorage.setItem('role', data.role); // Save role (Admin/User) to local storage
      localStorage.setItem('firstName', data.firstName); // Save user's first name to local storage

      // Redirect based on role
      if (data.role === 'Admin') {
        window.location.href = '/dashboard'; // Admins go to the dashboard
      } else {
        window.location.href = '/welcome'; // Users go to the welcome page
      }
    } catch (err) {
      alert('Invalid login credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

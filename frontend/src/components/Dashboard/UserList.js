import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersWithTickets = async () => {
      try {
        const { data } = await api.get('/users/with-tickets'); // Get users with their tickets
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsersWithTickets();
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      const { data } = await api.put(`/users/${id}/role`, { role });
      setUsers(users.map((user) => (user._id === id ? data : user)));
    } catch (err) {
      console.error('Error updating role:', err);
    }
  };

  const toggleActiveStatus = async (id) => {
    try {
      const { data } = await api.put(`/users/${id}/toggle-active`);
      setUsers(users.map((user) => (user._id === id ? data : user)));
    } catch (err) {
      console.error('Error toggling active status:', err);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
              <td>{user.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button
                  className={user.isActive ? 'deactivate' : 'activate'}
                  onClick={() => toggleActiveStatus(user._id)}
                >
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // Import the API service for backend communication

const UserList = () => {
  // State to store the list of users
  const [users, setUsers] = useState([]);

  // Fetch users with tickets from the backend when the component mounts
  useEffect(() => {
    const fetchUsersWithTickets = async () => {
      try {
        // GET request to fetch users and their associated tickets
        const { data } = await api.get('/users/with-tickets'); 
        setUsers(data); // Store the fetched data in the state
      } catch (err) {
        console.error('Error fetching users:', err); // Log any errors during the fetch
      }
    };

    fetchUsersWithTickets(); // Call the function to fetch users
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to handle role changes for a user
  const handleRoleChange = async (id, role) => {
    try {
      // PUT request to update the user's role
      const { data } = await api.put(`/users/${id}/role`, { role });
      // Update the state with the new role for the user
      setUsers(users.map((user) => (user._id === id ? data : user)));
    } catch (err) {
      console.error('Error updating role:', err); // Log any errors during the role update
    }
  };

  // Function to toggle the active/inactive status of a user
  const toggleActiveStatus = async (id) => {
    try {
      // PUT request to toggle the user's active status
      const { data } = await api.put(`/users/${id}/toggle-active`);
      // Update the state with the new status for the user
      setUsers(users.map((user) => (user._id === id ? data : user)));
    } catch (err) {
      console.error('Error toggling active status:', err); // Log any errors during the toggle
    }
  };

  return (
    <div>
      {/* Header for User Management Section */}
      <h2>User Management</h2>

      {/* Table to display the list of users */}
      <table>
        <thead>
          <tr>
            <th>Name</th> {/* Column for user's full name */}
            <th>Email</th> {/* Column for user's email */}
            <th>Role</th> {/* Column for user's role */}
            <th>Status</th> {/* Column for user's active/inactive status */}
            <th>Actions</th> {/* Column for action buttons */}
          </tr>
        </thead>
        <tbody>
          {/* Iterate through users and display each user in a row */}
          {users.map((user) => (
            <tr key={user._id}>
              <td>{`${user.firstName} ${user.lastName}`}</td> {/* Display user's full name */}
              <td>{user.email}</td> {/* Display user's email */}
              <td>
                {/* Dropdown to change the user's role */}
                <select
                  value={user.role} // Set the current role as the default value
                  onChange={(e) => handleRoleChange(user._id, e.target.value)} // Update the role on change
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
              <td>{user.isActive ? 'Active' : 'Inactive'}</td> {/* Display user's active status */}
              <td>
                {/* Button to toggle active/inactive status */}
                <button
                  className={user.isActive ? 'deactivate' : 'activate'} // Assign a class based on the current status
                  onClick={() => toggleActiveStatus(user._id)} // Toggle the status on click
                >
                  {user.isActive ? 'Deactivate' : 'Activate'} {/* Conditional button label */}
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

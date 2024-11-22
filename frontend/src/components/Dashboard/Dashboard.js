import React, { useState } from 'react';
import UserList from './UserList';
import TicketList from './TicketList';
import RewardList from './RewardList'; // Import RewardList
import '../../App.css'; // Import styles

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('users'); // Track active tab

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-tabs">
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
        <button
          className={activeTab === 'tickets' ? 'active' : ''}
          onClick={() => setActiveTab('tickets')}
        >
          Support Tickets
        </button>
        <button
          className={activeTab === 'rewards' ? 'active' : ''}
          onClick={() => setActiveTab('rewards')}
        >
          Rewards Management
        </button>
      </div>

      {activeTab === 'users' && <UserList />}
      {activeTab === 'tickets' && <TicketList />}
      {activeTab === 'rewards' && <RewardList />}
    </div>
  );
};

export default Dashboard;

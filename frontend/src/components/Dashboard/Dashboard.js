import React, { useState } from "react";
import UserList from "./UserList"; // Component for User Management
import TicketList from "./TicketList"; // Component for Ticket Management
import RewardList from "./RewardList"; // Component for Rewards Management
import ContentList from "./ContentList"; // Component for Content Management
import "../../App.css"; // Import global styles

// Main Dashboard component
const Dashboard = () => {
  // State to track the currently active tab (e.g., users, tickets, rewards, content)
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <h1>Admin Dashboard</h1>

      {/* Tabs for navigating between different sections of the dashboard */}
      <div className="dashboard-tabs">
        {/* Button for User Management tab */}
        <button
          className={activeTab === "users" ? "active" : ""} // Highlight active tab
          onClick={() => setActiveTab("users")} // Switch to User Management tab
        >
          User Management
        </button>

        {/* Button for Support Tickets tab */}
        <button
          className={activeTab === "tickets" ? "active" : ""} // Highlight active tab
          onClick={() => setActiveTab("tickets")} // Switch to Support Tickets tab
        >
          Support Tickets
        </button>

        {/* Button for Rewards Management tab */}
        <button
          className={activeTab === "rewards" ? "active" : ""} // Highlight active tab
          onClick={() => setActiveTab("rewards")} // Switch to Rewards Management tab
        >
          Rewards Management
        </button>

        {/* Button for Content Management tab */}
        <button
          className={activeTab === "content" ? "active" : ""} // Highlight active tab
          onClick={() => setActiveTab("content")} // Switch to Content Management tab
        >
          Content Management
        </button>
      </div>

      {/* Render the appropriate component based on the active tab */}
      {activeTab === "users" && <UserList />} {/* User Management section */}
      {activeTab === "tickets" && <TicketList />} {/* Support Tickets section */}
      {activeTab === "rewards" && <RewardList />} {/* Rewards Management section */}
      {activeTab === "content" && <ContentList />} {/* Content Management section */}
    </div>
  );
};

export default Dashboard;

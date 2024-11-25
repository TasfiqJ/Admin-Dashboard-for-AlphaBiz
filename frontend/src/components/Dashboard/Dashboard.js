import React, { useState } from "react";
import UserList from "./UserList";
import TicketList from "./TicketList";
import RewardList from "./RewardList";
import ContentList from "./ContentList"; 
import "../../App.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-tabs">
        <button className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
          User Management
        </button>
        <button className={activeTab === "tickets" ? "active" : ""} onClick={() => setActiveTab("tickets")}>
          Support Tickets
        </button>
        <button className={activeTab === "rewards" ? "active" : ""} onClick={() => setActiveTab("rewards")}>
          Rewards Management
        </button>
        <button className={activeTab === "content" ? "active" : ""} onClick={() => setActiveTab("content")}>
          Content Management
        </button>
      </div>

      {activeTab === "users" && <UserList />}
      {activeTab === "tickets" && <TicketList />}
      {activeTab === "rewards" && <RewardList />}
      {activeTab === "content" && <ContentList />}
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from 'react';

const RewardList = () => {
  // State for storing the list of rewards
  const [rewards, setRewards] = useState([
    {
      _id: "1",
      name: "10% Discount Voucher",
      pointsRequired: 100,
      description: "A 10% discount on your next purchase",
    },
    {
      _id: "2",
      name: "Free Coffee Mug",
      pointsRequired: 50,
      description: "A branded coffee mug for coffee lovers",
    },
    {
      _id: "3",
      name: "Gift Card",
      pointsRequired: 150,
      description: "A $20 gift card for online shopping",
    },
  ]);

  // State for storing redemption requests
  const [redemptions, setRedemptions] = useState([
    {
      _id: "1",
      userId: { email: "john.doe@example.com" }, // Mock user email
      rewardId: { name: "10% Discount Voucher" }, // Mock reward name
      status: "Pending",
    },
    {
      _id: "2",
      userId: { email: "jane.smith@example.com" }, // Mock user email
      rewardId: { name: "Free Coffee Mug" }, // Mock reward name
      status: "Approved",
    },
  ]);

  // State for storing user details
  const [users, setUsers] = useState([
    {
      _id: "67400c934e73828bf10d8196",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      loyaltyPoints: 120,
    },
    {
      _id: "67400c934e73828bf10d8197",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      loyaltyPoints: 80,
    },
  ]);

  // State for storing a new reward being added
  const [newReward, setNewReward] = useState({ name: '', pointsRequired: '', description: '' });

  // Function to add a new reward
  const addReward = () => {
    const newRewardData = { ...newReward, _id: Date.now().toString() }; // Generate a fake unique ID
    setRewards([...rewards, newRewardData]); // Add the new reward to the list
    setNewReward({ name: '', pointsRequired: '', description: '' }); // Clear the form
  };

  // Function to delete a reward by its ID
  const deleteReward = (id) => {
    setRewards(rewards.filter((reward) => reward._id !== id)); // Remove the reward from the list
  };

  // Function to adjust loyalty points for a specific user
  const adjustPoints = (userId, points) => {
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, loyaltyPoints: parseInt(points) || user.loyaltyPoints } : user
      )
    );
  };

  // Function to update the status of a redemption request
  const updateRedemptionStatus = (id, status) => {
    setRedemptions(
      redemptions.map((redemption) =>
        redemption._id === id ? { ...redemption, status } : redemption
      )
    );
  };

  return (
    <div>
      {/* Header for Rewards Management */}
      <h2>Rewards Management</h2>

      {/* Section to add a new reward */}
      <div>
        <h3>Rewards Catalog</h3>
        <input
          type="text"
          placeholder="Name" // Input for reward name
          value={newReward.name}
          onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Points Required" // Input for points required to redeem the reward
          value={newReward.pointsRequired}
          onChange={(e) => setNewReward({ ...newReward, pointsRequired: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description" // Input for reward description
          value={newReward.description}
          onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
        />
        <button onClick={addReward}>Add Reward</button> {/* Button to add reward */}
        <ul>
          {rewards.map((reward) => (
            <li key={reward._id}>
              {reward.name} - {reward.pointsRequired} points
              <button onClick={() => deleteReward(reward._id)}>Delete</button> {/* Button to delete reward */}
            </li>
          ))}
        </ul>
      </div>

      {/* Section to adjust loyalty points for users */}
      <div>
        <h3>Adjust Loyalty Points</h3>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Points</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{`${user.firstName} ${user.lastName}`}</td> {/* Display user's full name */}
                <td>{user.loyaltyPoints}</td> {/* Display user's loyalty points */}
                <td>
                  <button
                    onClick={() =>
                      adjustPoints(user._id, prompt('Enter new points:')) // Prompt to enter new points
                    }
                  >
                    Adjust Points
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section for redemption requests */}
      <div>
        <h3>Redemption Requests</h3>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Reward</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {redemptions.map((redemption) => (
              <tr key={redemption._id}>
                <td>{redemption.userId?.email}</td> {/* Display user email */}
                <td>{redemption.rewardId?.name}</td> {/* Display reward name */}
                <td>{redemption.status}</td> {/* Display redemption status */}
                <td>
                  <button onClick={() => updateRedemptionStatus(redemption._id, 'Approved')}>
                    Approve
                  </button>
                  <button onClick={() => updateRedemptionStatus(redemption._id, 'Rejected')}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RewardList;

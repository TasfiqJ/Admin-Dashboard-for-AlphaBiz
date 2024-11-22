import React, { useState, useEffect } from 'react';

const RewardList = () => {
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

  const [newReward, setNewReward] = useState({ name: '', pointsRequired: '', description: '' });

  const addReward = () => {
    const newRewardData = { ...newReward, _id: Date.now().toString() }; // Generate fake ID
    setRewards([...rewards, newRewardData]);
    setNewReward({ name: '', pointsRequired: '', description: '' });
  };

  const deleteReward = (id) => {
    setRewards(rewards.filter((reward) => reward._id !== id));
  };

  const adjustPoints = (userId, points) => {
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, loyaltyPoints: parseInt(points) || user.loyaltyPoints } : user
      )
    );
  };

  const updateRedemptionStatus = (id, status) => {
    setRedemptions(
      redemptions.map((redemption) =>
        redemption._id === id ? { ...redemption, status } : redemption
      )
    );
  };

  return (
    <div>
      <h2>Rewards Management</h2>

      {/* Rewards Catalog */}
      <div>
        <h3>Rewards Catalog</h3>
        <input
          type="text"
          placeholder="Name"
          value={newReward.name}
          onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Points Required"
          value={newReward.pointsRequired}
          onChange={(e) => setNewReward({ ...newReward, pointsRequired: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newReward.description}
          onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
        />
        <button onClick={addReward}>Add Reward</button>
        <ul>
          {rewards.map((reward) => (
            <li key={reward._id}>
              {reward.name} - {reward.pointsRequired} points
              <button onClick={() => deleteReward(reward._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Adjust Points */}
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
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.loyaltyPoints}</td>
                <td>
                  <button
                    onClick={() =>
                      adjustPoints(user._id, prompt('Enter new points:'))
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

      {/* Redemption Requests */}
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
                <td>{redemption.userId?.email}</td>
                <td>{redemption.rewardId?.name}</td>
                <td>{redemption.status}</td>
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

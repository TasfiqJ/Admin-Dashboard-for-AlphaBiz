import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const RewardList = () => {
  const [rewards, setRewards] = useState([]);
  const [redemptions, setRedemptions] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const { data } = await api.get('/rewards');
        setRewards(data);
      } catch (err) {
        console.error('Error fetching rewards:', err);
      }
    };

    const fetchRedemptions = async () => {
      try {
        const { data } = await api.get('/rewards/redemptions');
        setRedemptions(data);
      } catch (err) {
        console.error('Error fetching redemptions:', err);
      }
    };

    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/users');
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchRewards();
    fetchRedemptions();
    fetchUsers();
  }, []);

  const adjustPoints = async (userId, points) => {
    try {
      const { data } = await api.put(`/rewards/points/${userId}`, { points });
      setUsers(users.map((user) => (user._id === userId ? data : user)));
    } catch (err) {
      console.error('Error adjusting points:', err);
    }
  };

  const updateRedemptionStatus = async (id, status) => {
    try {
      const { data } = await api.put(`/rewards/redemptions/${id}`, { status });
      setRedemptions(
        redemptions.map((redemption) => (redemption._id === id ? data : redemption))
      );
    } catch (err) {
      console.error('Error updating redemption status:', err);
    }
  };

  return (
    <div>
      <h2>Rewards Management</h2>
      <div>
        <h3>Rewards Catalog</h3>
        <ul>
          {rewards.map((reward) => (
            <li key={reward._id}>
              {reward.name} - {reward.pointsRequired} points
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Adjust Loyalty Points</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
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

      <div>
        <h3>Redemptions</h3>
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
                  <button
                    onClick={() => updateRedemptionStatus(redemption._id, 'Approved')}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateRedemptionStatus(redemption._id, 'Rejected')}
                  >
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

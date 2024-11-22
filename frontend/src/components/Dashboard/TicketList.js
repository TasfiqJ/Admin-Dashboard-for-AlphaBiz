import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await api.get('/tickets');
        setTickets(data);
      } catch (err) {
        console.error('Error fetching tickets:', err);
      }
    };

    fetchTickets();
  }, []);

  const handleResponse = async (id, response) => {
    try {
      const { data } = await api.put(`/tickets/${id}/response`, { response });
      setTickets(tickets.map((ticket) => (ticket._id === id ? data : ticket)));
    } catch (err) {
      console.error('Error responding to ticket:', err);
    }
  };

  const toggleResolveStatus = async (id) => {
    try {
      const { data } = await api.put(`/tickets/${id}/resolve`);
      setTickets(tickets.map((ticket) => (ticket._id === id ? data : ticket)));
    } catch (err) {
      console.error('Error toggling ticket status:', err);
    }
  };

  return (
    <div>
      <h2>Support Tickets</h2>
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Status</th>
            <th>Admin Response</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket.clientName}</td>
              <td>{ticket.email}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.message}</td>
              <td>{ticket.status}</td>
              <td>{ticket.adminResponse || 'No response yet'}</td>
              <td>
                <button
                  className="resolve"
                  onClick={() => toggleResolveStatus(ticket._id)}
                >
                  {ticket.status === 'Open' ? 'Mark Resolved' : 'Reopen'}
                </button>
                <button
                  className="respond"
                  onClick={() =>
                    handleResponse(ticket._id, prompt('Enter your response:'))
                  }
                >
                  Respond
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;

import React, { useState, useEffect } from 'react';
import { api2 } from '../../services/api'; // Use api2 instead of api

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await api2.get('/tickets'); // Fetch from the second API
        // Map data to match the new schema fields
        const formattedTickets = data.map((ticket) => ({
          ticketID: ticket._id,
          clientFullName: ticket.clientFullName, // Map to new schema field
          clientEmail: ticket.clientEmail,
          ticketSubject: ticket.ticketSubject,
          ticketDescription: ticket.ticketDescription,
          ticketStatus: ticket.ticketStatus,
          adminResponse: ticket.adminResponse,
        }));
        setTickets(formattedTickets);
      } catch (err) {
        console.error('Error fetching tickets:', err);
      }
    };

    fetchTickets();
  }, []);

  const handleResponse = async (id, response) => {
    try {
      const { data } = await api2.put(`/tickets/${id}/response`, { response });
      setTickets(tickets.map((ticket) => (ticket.ticketID === id ? {
        ...ticket,
        adminResponse: data.adminResponse,
      } : ticket)));
    } catch (err) {
      console.error('Error responding to ticket:', err);
    }
  };

  const toggleResolveStatus = async (id) => {
    try {
      const { data } = await api2.put(`/tickets/${id}/resolve`);
      setTickets(tickets.map((ticket) => (ticket.ticketID === id ? {
        ...ticket,
        ticketStatus: data.status,
      } : ticket)));
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
            <th>Description</th>
            <th>Status</th>
            <th>Admin Response</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.ticketID}>
              <td>{ticket.clientFullName}</td>
              <td>{ticket.clientEmail}</td>
              <td>{ticket.ticketSubject}</td>
              <td>{ticket.ticketDescription}</td>
              <td>{ticket.ticketStatus}</td>
              <td>{ticket.adminResponse || 'No response yet'}</td>
              <td>
                <button
                  className="resolve"
                  onClick={() => toggleResolveStatus(ticket.ticketID)}
                >
                  {ticket.ticketStatus === 'Open' ? 'Mark Resolved' : 'Reopen'}
                </button>
                <button
                  className="respond"
                  onClick={() =>
                    handleResponse(ticket.ticketID, prompt('Enter your response:'))
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

import React, { useState, useEffect } from 'react';
import { api2 } from '../../services/api'; // Use api2 for ticket-related operations

const TicketList = () => {
  // State to store the list of tickets
  const [tickets, setTickets] = useState([]);

  // Fetch tickets from the second API when the component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await api2.get('/tickets'); // Fetch data from the backend
        // Format the ticket data to match the required fields for display
        const formattedTickets = data.map((ticket) => ({
          ticketID: ticket._id, // Use _id from the backend as ticketID
          clientFullName: ticket.clientFullName, // Full name of the client
          clientEmail: ticket.clientEmail, // Client's email address
          ticketSubject: ticket.ticketSubject, // Subject of the ticket
          ticketDescription: ticket.ticketDescription, // Description of the issue
          ticketStatus: ticket.ticketStatus, // Status of the ticket (Open/Resolved)
          adminResponse: ticket.adminResponse, // Admin's response to the ticket
        }));
        setTickets(formattedTickets); // Store the formatted tickets in state
      } catch (err) {
        console.error('Error fetching tickets:', err); // Log any errors during fetch
      }
    };

    fetchTickets(); // Call the fetchTickets function
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to handle admin response to a ticket
  const handleResponse = async (id, response) => {
    try {
      const { data } = await api2.put(`/tickets/${id}/response`, { response }); // Update the response on the backend
      // Update the specific ticket with the new admin response
      setTickets(tickets.map((ticket) => (ticket.ticketID === id ? {
        ...ticket,
        adminResponse: data.adminResponse, // Update the response field
      } : ticket)));
    } catch (err) {
      console.error('Error responding to ticket:', err); // Log any errors during the response update
    }
  };

  // Function to toggle the resolve status of a ticket
  const toggleResolveStatus = async (id) => {
    try {
      const { data } = await api2.put(`/tickets/${id}/resolve`); // Toggle resolve status on the backend
      // Update the specific ticket with the new status
      setTickets(tickets.map((ticket) => (ticket.ticketID === id ? {
        ...ticket,
        ticketStatus: data.status, // Update the status field
      } : ticket)));
    } catch (err) {
      console.error('Error toggling ticket status:', err); // Log any errors during status update
    }
  };

  return (
    <div>
      {/* Header for Support Tickets */}
      <h2>Support Tickets</h2>

      {/* Table to display tickets */}
      <table>
        <thead>
          <tr>
            <th>Client Name</th> {/* Column for client's full name */}
            <th>Email</th> {/* Column for client's email */}
            <th>Subject</th> {/* Column for ticket subject */}
            <th>Description</th> {/* Column for ticket description */}
            <th>Status</th> {/* Column for ticket status */}
            <th>Admin Response</th> {/* Column for admin's response */}
            <th>Actions</th> {/* Column for actions (Respond/Toggle Status) */}
          </tr>
        </thead>
        <tbody>
          {/* Iterate over the tickets and display each one in a row */}
          {tickets.map((ticket) => (
            <tr key={ticket.ticketID}>
              <td>{ticket.clientFullName}</td> {/* Display client's full name */}
              <td>{ticket.clientEmail}</td> {/* Display client's email */}
              <td>{ticket.ticketSubject}</td> {/* Display ticket subject */}
              <td>{ticket.ticketDescription}</td> {/* Display ticket description */}
              <td>{ticket.ticketStatus}</td> {/* Display ticket status */}
              <td>{ticket.adminResponse || 'No response yet'}</td> {/* Display admin's response */}
              <td>
                {/* Button to toggle resolve status */}
                <button
                  className="resolve"
                  onClick={() => toggleResolveStatus(ticket.ticketID)}
                >
                  {/* Conditional label based on current ticket status */}
                  {ticket.ticketStatus === 'Open' ? 'Mark Resolved' : 'Reopen'}
                </button>
                {/* Button to respond to the ticket */}
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

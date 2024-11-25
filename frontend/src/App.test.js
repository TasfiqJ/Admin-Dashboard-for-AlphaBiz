import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './components/Dashboard/Dashboard';
import UserList from './components/Dashboard/UserList';
import TicketList from './components/Dashboard/TicketList';
import RewardList from './components/Dashboard/RewardList';
import ContentList from './components/Dashboard/ContentList';

describe('Dashboard Component', () => {
  test('renders the dashboard header', () => {
    render(<Dashboard />);
    const headerElement = screen.getByText(/Admin Dashboard/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders all tabs and allows switching between them', () => {
    render(<Dashboard />);
    const userTab = screen.getByText(/User Management/i);
    const ticketTab = screen.getByText(/Support Tickets/i);
    const rewardTab = screen.getByText(/Rewards Management/i);
    const contentTab = screen.getByText(/Content Management/i);

    // Check if all tabs are rendered
    expect(userTab).toBeInTheDocument();
    expect(ticketTab).toBeInTheDocument();
    expect(rewardTab).toBeInTheDocument();
    expect(contentTab).toBeInTheDocument();

    // Simulate tab switching
    fireEvent.click(ticketTab);
    expect(screen.getByText(/Support Tickets/i)).toHaveClass('active');

    fireEvent.click(rewardTab);
    expect(screen.getByText(/Rewards Management/i)).toHaveClass('active');
  });
});

describe('UserList Component', () => {
  test('renders user table with appropriate headers', () => {
    render(<UserList />);
    const headers = ['Name', 'Email', 'Role', 'Status', 'Actions'];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('allows changing user roles', () => {
    render(<UserList />);
    const roleDropdown = screen.getByRole('combobox');
    fireEvent.change(roleDropdown, { target: { value: 'Admin' } });
    expect(roleDropdown.value).toBe('Admin');
  });

  test('toggles user active status', () => {
    render(<UserList />);
    const toggleButton = screen.getByText(/Deactivate/i); // Or 'Activate' based on initial state
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent(/Activate/i); // Check if text changes after click
  });
});

describe('TicketList Component', () => {
  test('renders ticket table with appropriate headers', () => {
    render(<TicketList />);
    const headers = ['Client Name', 'Email', 'Subject', 'Description', 'Status', 'Admin Response', 'Actions'];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('marks ticket as resolved', () => {
    render(<TicketList />);
    const resolveButton = screen.getByText(/Mark Resolved/i); // Assuming ticket is initially 'Open'
    fireEvent.click(resolveButton);
    expect(resolveButton).toHaveTextContent(/Reopen/i); // Check if text changes after click
  });

  test('allows responding to a ticket', () => {
    render(<TicketList />);
    const respondButton = screen.getByText(/Respond/i);
    fireEvent.click(respondButton);
    const responsePrompt = 'Admin response here'; // Mock prompt input
    window.prompt = jest.fn(() => responsePrompt);
    expect(window.prompt).toHaveBeenCalled();
  });
});

describe('RewardList Component', () => {
  test('renders reward catalog headers', () => {
    render(<RewardList />);
    expect(screen.getByText(/Rewards Catalog/i)).toBeInTheDocument();
  });

  test('adds a new reward', () => {
    render(<RewardList />);
    const addButton = screen.getByText(/Add Reward/i);
    const nameInput = screen.getByPlaceholderText(/Name/i);
    const pointsInput = screen.getByPlaceholderText(/Points Required/i);
    const descriptionInput = screen.getByPlaceholderText(/Description/i);

    fireEvent.change(nameInput, { target: { value: 'Test Reward' } });
    fireEvent.change(pointsInput, { target: { value: 100 } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(addButton);

    expect(screen.getByText(/Test Reward/i)).toBeInTheDocument();
  });

  test('deletes a reward', () => {
    render(<RewardList />);
    const deleteButton = screen.getAllByText(/Delete/i)[0]; // Assuming at least one reward exists
    fireEvent.click(deleteButton);
    expect(deleteButton).not.toBeInTheDocument(); // Deleted reward button should not exist
  });
});

describe('ContentList Component', () => {
  test('renders content table headers', () => {
    render(<ContentList />);
    expect(screen.getByText(/Add New Content/i)).toBeInTheDocument();
    expect(screen.getByText(/Existing Content/i)).toBeInTheDocument();
  });

  test('adds a new content item', () => {
    render(<ContentList />);
    const addButton = screen.getByText(/Add Content/i);
    const titleInput = screen.getByPlaceholderText(/Title/i);
    const descriptionInput = screen.getByPlaceholderText(/Description/i);
    const urlInput = screen.getByPlaceholderText(/File URL/i);

    fireEvent.change(titleInput, { target: { value: 'Test Content' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(urlInput, { target: { value: 'http://test.com/file' } });
    fireEvent.click(addButton);

    expect(screen.getByText(/Test Content/i)).toBeInTheDocument();
  });

  test('deletes a content item', () => {
    render(<ContentList />);
    const deleteButton = screen.getAllByText(/Delete/i)[0]; // Assuming at least one content exists
    fireEvent.click(deleteButton);
    expect(deleteButton).not.toBeInTheDocument(); // Deleted content button should not exist
  });
});

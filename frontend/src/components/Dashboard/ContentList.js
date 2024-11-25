import React, { useState, useEffect } from "react";
import api from "../../services/api";

const ContentList = () => {
  // State to store the list of content items
  const [contents, setContents] = useState([]);

  // State to store the new content details for the form
  const [newContent, setNewContent] = useState({
    title: "", // Title of the content
    description: "", // Description of the content
    fileUrl: "", // URL for the file (e.g., PDF, video)
    eventDate: "", // Optional event date for the content
  });

  // Fetch the list of contents from the backend when the component is mounted
  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await api.get("/content"); // GET request to fetch contents
        setContents(response.data); // Store the fetched contents in state
      } catch (err) {
        console.error("Failed to fetch content:", err); // Log any errors during fetch
      }
    };
    fetchContents(); // Call the fetchContents function
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to add a new content item
  const addContent = async () => {
    try {
      const response = await api.post("/content", newContent); // POST request to add new content
      setContents([...contents, response.data]); // Add the new content to the list
      // Reset the form fields
      setNewContent({ title: "", description: "", fileUrl: "", eventDate: "" });
    } catch (err) {
      console.error("Failed to add content:", err); // Log any errors during addition
    }
  };

  // Function to delete a content item by its ID
  const deleteContent = async (id) => {
    try {
      await api.delete(`/content/${id}`); // DELETE request to remove content by ID
      // Update the contents state to remove the deleted content
      setContents(contents.filter((content) => content._id !== id));
    } catch (err) {
      console.error("Failed to delete content:", err); // Log any errors during deletion
    }
  };

  return (
    <div>
      {/* Header for Content Management */}
      <h2>Content Management</h2>

      {/* Form to add new content */}
      <div>
        <h3>Add New Content</h3>
        <input
          type="text"
          placeholder="Title" // Input for content title
          value={newContent.title}
          onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description" // Input for content description
          value={newContent.description}
          onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="File URL" // Input for the file URL
          value={newContent.fileUrl}
          onChange={(e) => setNewContent({ ...newContent, fileUrl: e.target.value })}
        />
        <input
          type="date"
          placeholder="Event Date" // Input for optional event date
          value={newContent.eventDate}
          onChange={(e) => setNewContent({ ...newContent, eventDate: e.target.value })}
        />
        <button onClick={addContent}>Add Content</button> {/* Button to add content */}
      </div>

      {/* List of existing content */}
      <div>
        <h3>Existing Content</h3>
        <ul>
          {contents.map((content) => (
            <li key={content._id}>
              {/* Display content title and description */}
              <strong>{content.title}</strong>: {content.description}
              <br />
              {/* Link to view the associated file */}
              <a href={content.fileUrl} target="_blank" rel="noopener noreferrer">
                View File
              </a>
              {/* Display the event date if it exists */}
              {content.eventDate && <p>Event Date: {new Date(content.eventDate).toLocaleDateString()}</p>}
              {/* Button to delete the content */}
              <button onClick={() => deleteContent(content._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentList;

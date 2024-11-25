import React, { useState, useEffect } from "react";
import api from "../../services/api";

const ContentList = () => {
  const [contents, setContents] = useState([]);
  const [newContent, setNewContent] = useState({
    title: "",
    description: "",
    fileUrl: "",
    eventDate: "",
  });

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await api.get("/content");
        setContents(response.data);
      } catch (err) {
        console.error("Failed to fetch content:", err);
      }
    };
    fetchContents();
  }, []);

  const addContent = async () => {
    try {
      const response = await api.post("/content", newContent);
      setContents([...contents, response.data]);
      setNewContent({ title: "", description: "", fileUrl: "", eventDate: "" });
    } catch (err) {
      console.error("Failed to add content:", err);
    }
  };

  const deleteContent = async (id) => {
    try {
      await api.delete(`/content/${id}`);
      setContents(contents.filter((content) => content._id !== id));
    } catch (err) {
      console.error("Failed to delete content:", err);
    }
  };

  return (
    <div>
      <h2>Content Management</h2>
      <div>
        <h3>Add New Content</h3>
        <input
          type="text"
          placeholder="Title"
          value={newContent.title}
          onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newContent.description}
          onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="File URL"
          value={newContent.fileUrl}
          onChange={(e) => setNewContent({ ...newContent, fileUrl: e.target.value })}
        />
        <input
          type="date"
          placeholder="Event Date"
          value={newContent.eventDate}
          onChange={(e) => setNewContent({ ...newContent, eventDate: e.target.value })}
        />
        <button onClick={addContent}>Add Content</button>
      </div>

      <div>
        <h3>Existing Content</h3>
        <ul>
          {contents.map((content) => (
            <li key={content._id}>
              <strong>{content.title}</strong>: {content.description}
              <br />
              <a href={content.fileUrl} target="_blank" rel="noopener noreferrer">
                View File
              </a>
              {content.eventDate && <p>Event Date: {new Date(content.eventDate).toLocaleDateString()}</p>}
              <button onClick={() => deleteContent(content._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentList;
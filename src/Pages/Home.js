import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const Info = ({ text }) => (
  <span
    style={{
      marginLeft: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      color: "#0a75ff",
    }}
    title={text}
  >
    ℹ️
  </span>
);

const Home = () => {
  const navigate = useNavigate();

  const [folder, setFolder] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [cover, setCover] = useState("");

  const [uploadMessage, setUploadMessage] = useState("");
  const [syncMessage, setSyncMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [syncFolder, setSyncFolder] = useState("");
  const [syncName, setSyncName] = useState("");
  const [syncCover, setSyncCover] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadMessage("");

    try {
      const res = await axios.post(
        `${API_URL}/api/images/upload`,
        { folder, name, type, cover }
      );

      setUploadMessage(res.data.message || " Folder uploaded successfully!");
      setFolder("");
      setName("");
      setType("");
      setCover("");
    } catch (error) {
      console.error(" Upload error:", error);
      setUploadMessage(" Upload failed. Please check all fields and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSyncMessage("");

    try {
      const payload = { folder: syncFolder, name: syncName };
      if (syncCover && syncCover.trim() !== "") {
        payload.cover = syncCover;
      }

      const res = await axios.post(
        `${API_URL}/api/images/sync`,
        payload
      );

      setSyncMessage(
        ` Sync completed: ${res.data.added} added, ${res.data.removed} removed. ${
          res.data.coverUpdated ? "Cover image updated!" : ""
        }`
      );

      setSyncFolder("");
      setSyncName("");
      setSyncCover("");
    } catch (error) {
      console.error(" Sync error:", error);
      setSyncMessage(" Sync failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
          margin: "20px auto",
        }}
      >
        <button
          onClick={() => navigate("/guide")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          📘 Go to Guide
        </button>
        <button
          onClick={() => navigate("/reviews")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6f42c1",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Reviews
        </button>
      </div>

      <div
        style={{
          maxWidth: "450px",
          margin: "2rem auto",
          padding: "2rem",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          background: "#fff",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontSize: "1.4rem",
            color: "#333",
          }}
        >
          📁 Import Cloudinary Folder
        </h2>



        <form onSubmit={handleSubmit}>
 
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Folder Name
              <Info text="Add the name of the Cloudinary folder you want to import." />
            </label>
            <input
              type="text"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>

  
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Project Name
              <Info text="This is the name that will appear on the website." />
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>

    
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Type
              <Info text="Choose where you want this folder to appear on your website (e.g.,Portfolio or Service)" />
            </label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              placeholder="Portfolio or Service"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Cover Image URL
              <Info text="This image will be used as the main cover image for the folder on your website." />
            </label>
            <input
              type="text"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: loading ? "#777" : "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            {loading ? "Uploading..." : "Upload Folder"}
          </button>
        </form>

        {uploadMessage && (
          <p
            style={{
              marginTop: "1rem",
              textAlign: "center",
              color: uploadMessage.includes("❌") ? "red" : "green",
              fontWeight: "bold",
            }}
          >
            {uploadMessage}
          </p>
        )}
      </div>

      <div
        style={{
          marginTop: "3rem",
          padding: "2rem",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          maxWidth: "450px",
          marginLeft: "auto",
          marginRight: "auto",
          background: "#fff",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontSize: "1.4rem",
            color: "#333",
          }}
        >
          🔄 Sync Cloudinary Folder
        </h2>

        <form onSubmit={handleSync}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Cloudinary Folder Name
              <Info text="Enter the name of the Cloudinary folder you want to update." />
            </label>
            <input
              type="text"
              value={syncFolder}
              onChange={(e) => setSyncFolder(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Folder Name in Site
              <Info text="Enter the folder name from your website that you want to update." />
            </label>
            <input
              type="text"
              value={syncName}
              onChange={(e) => setSyncName(e.target.value)}
              placeholder="e.g., Birthday, Proposal"
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              New Cover Image URL (optional)
              <Info text="Provide a new cover image URL if you want to update the existing one." />
            </label>
            <input
              type="text"
              value={syncCover}
              onChange={(e) => setSyncCover(e.target.value)}
              placeholder="Leave empty to keep current cover"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: loading ? "#777" : "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            {loading ? "Syncing..." : "Sync Folder"}
          </button>
        </form>

        {syncMessage && (
          <p
            style={{
              marginTop: "1rem",
              textAlign: "center",
              color: syncMessage.includes("❌") ? "red" : "green",
              fontWeight: "bold",
            }}
          >
            {syncMessage}
          </p>
        )}
      </div>
    </>
  );
};

export default Home;

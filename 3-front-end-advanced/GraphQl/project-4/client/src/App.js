import React, { useState } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleUserCreated = (user) => {
    setCurrentUser(user);
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {!currentUser ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
          }}
        >
          <h2 style={{ color: "#555", marginBottom: "20px" }}>
            Welcome! Create a username to join the chat
          </h2>
          <UserForm onUserCreated={handleUserCreated} />
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "#e3f2fd",
              borderRadius: "8px",
            }}
          >
            <span style={{ fontSize: "16px", color: "#1976d2" }}>
              Welcome, <strong>{currentUser.username}</strong>!
            </span>
            <button
              onClick={() => setCurrentUser(null)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Switch User
            </button>
          </div>

          <ChatRoom currentUser={currentUser} />
        </>
      )}
    </div>
  );
}

export default App;

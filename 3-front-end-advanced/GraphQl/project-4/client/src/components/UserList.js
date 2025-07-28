import React from "react";

const UserList = ({ users, currentUser }) => {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "15px",
          borderBottom: "1px solid #ddd",
          fontWeight: "bold",
          backgroundColor: "#e9ecef",
        }}
      >
        Online Users ({users.length})
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
        }}
      >
        {users.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#666",
              fontStyle: "italic",
              marginTop: "20px",
            }}
          >
            No users online
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              style={{
                padding: "10px",
                margin: "5px 0",
                backgroundColor:
                  currentUser && user.id === currentUser.id
                    ? "#e3f2fd"
                    : "#ffffff",
                border:
                  currentUser && user.id === currentUser.id
                    ? "2px solid #2196f3"
                    : "1px solid #e0e0e0",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#4caf50",
                  borderRadius: "50%",
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight:
                    currentUser && user.id === currentUser.id
                      ? "bold"
                      : "normal",
                  color:
                    currentUser && user.id === currentUser.id
                      ? "#1976d2"
                      : "#333",
                }}
              >
                {user.username}
                {currentUser && user.id === currentUser.id && " (You)"}
              </span>
            </div>
          ))
        )}
      </div>

      {currentUser && (
        <div
          style={{
            padding: "10px",
            borderTop: "1px solid #ddd",
            backgroundColor: "#e9ecef",
            fontSize: "12px",
            color: "#666",
            textAlign: "center",
          }}
        >
          Logged in as: <strong>{currentUser.username}</strong>
        </div>
      )}
    </div>
  );
};

export default UserList;

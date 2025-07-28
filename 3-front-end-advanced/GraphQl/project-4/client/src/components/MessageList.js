import React, { useEffect, useRef } from "react";

const MessageList = ({ messages, users }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getUserById = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.username : `User ${userId}`;
  };

  const formatTime = (timestamp) => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "15px",
        backgroundColor: "#ffffff",
      }}
    >
      {messages.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            color: "#666",
            marginTop: "50px",
            fontStyle: "italic",
          }}
        >
          No messages yet. Start the conversation!
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            style={{
              marginBottom: "15px",
              padding: "12px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              borderLeft: "4px solid #007bff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  color: "#007bff",
                  fontSize: "14px",
                }}
              >
                {getUserById(message.userId)}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#666",
                }}
              >
                {formatTime()}
              </span>
            </div>
            <div
              style={{
                color: "#333",
                lineHeight: "1.4",
              }}
            >
              {message.text}
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;

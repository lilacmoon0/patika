import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_MESSAGE } from "../graphql/mutations";

const MessageForm = ({ currentUser }) => {
  const [message, setMessage] = useState("");
  const [createMessage, { loading, error }] = useMutation(CREATE_MESSAGE, {
    onCompleted: () => {
      setMessage("");
      console.log("Message sent successfully");
    },
    onError: (error) => {
      console.error("Error sending message:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && currentUser) {
      createMessage({
        variables: {
          input: {
            text: message.trim(),
            userId: currentUser.id,
          },
        },
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!currentUser) {
    return (
      <div
        style={{
          padding: "15px",
          borderTop: "1px solid #ddd",
          backgroundColor: "#f8f9fa",
          textAlign: "center",
          color: "#666",
        }}
      >
        Please create a user to start chatting
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "15px",
        borderTop: "1px solid #ddd",
        backgroundColor: "#ffffff",
      }}
    >
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Type your message as ${currentUser.username}...`}
          style={{
            flex: 1,
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            resize: "none",
            rows: 1,
            minHeight: "20px",
            maxHeight: "100px",
            fontSize: "14px",
            fontFamily: "inherit",
          }}
          disabled={loading}
          rows={1}
        />
        <button
          type="submit"
          disabled={loading || !message.trim()}
          style={{
            padding: "12px 20px",
            backgroundColor: loading || !message.trim() ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: loading || !message.trim() ? "not-allowed" : "pointer",
            fontWeight: "bold",
            minWidth: "80px",
          }}
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
      {error && (
        <div
          style={{
            color: "red",
            fontSize: "12px",
            marginTop: "5px",
          }}
        >
          Error: {error.message}
        </div>
      )}
      <div
        style={{
          fontSize: "11px",
          color: "#666",
          marginTop: "5px",
        }}
      >
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  );
};

export default MessageForm;

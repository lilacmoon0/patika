import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import { GET_USERS } from "../graphql/queries";

const UserForm = ({ onUserCreated }) => {
  const [username, setUsername] = useState("");
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onCompleted: (data) => {
      setUsername("");
      if (onUserCreated) {
        onUserCreated(data.createUser);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      createUser({ variables: { username: username.trim() } });
    }
  };

  return (
    <div
      style={{
        margin: "20px 0",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h3>Create User</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          style={{ padding: "10px", marginRight: "10px", width: "200px" }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !username.trim()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          Error: {error.message}
        </p>
      )}
    </div>
  );
};

export default UserForm;

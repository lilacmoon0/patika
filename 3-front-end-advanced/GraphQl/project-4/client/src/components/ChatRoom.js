import React, { useState, useEffect } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_MESSAGES, GET_USERS } from "../graphql/queries";
import { MESSAGE_ADDED, USER_ADDED } from "../graphql/subscriptions";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import UserList from "./UserList";

const ChatRoom = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  // Query initial data
  const {
    data: messagesData,
    loading: messagesLoading,
    error: messagesError,
  } = useQuery(GET_MESSAGES);
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery(GET_USERS);

  // Subscribe to new messages
  useSubscription(MESSAGE_ADDED, {
    onData: ({ data }) => {
      console.log("New message received via subscription:", data);
      if (data?.data?.messageAdded) {
        setMessages((prevMessages) => {
          const newMessage = data.data.messageAdded;
          // Avoid duplicates
          const exists = prevMessages.find((msg) => msg.id === newMessage.id);
          if (!exists) {
            console.log("Adding new message to state:", newMessage);
            return [...prevMessages, newMessage];
          } else {
            console.log("Message already exists, skipping:", newMessage.id);
          }
          return prevMessages;
        });
      }
    },
    onError: (error) => {
      console.error("Message subscription error:", error);
    },
  });

  // Subscribe to new users
  useSubscription(USER_ADDED, {
    onData: ({ data }) => {
      console.log("New user received via subscription:", data);
      if (data?.data?.userAdded) {
        setUsers((prevUsers) => {
          const newUser = data.data.userAdded;
          // Avoid duplicates
          const exists = prevUsers.find((user) => user.id === newUser.id);
          if (!exists) {
            console.log("Adding new user to state:", newUser);
            return [...prevUsers, newUser];
          } else {
            console.log("User already exists, skipping:", newUser.id);
          }
          return prevUsers;
        });
      }
    },
    onError: (error) => {
      console.error("User subscription error:", error);
    },
  });

  // Initialize messages and users when queries complete
  useEffect(() => {
    if (messagesData?.messages) {
      console.log("Initial messages loaded:", messagesData.messages);
      console.log(
        "Setting initial messages count:",
        messagesData.messages.length
      );
      setMessages(messagesData.messages);
    }
  }, [messagesData]);

  useEffect(() => {
    if (usersData?.users) {
      console.log("Initial users loaded:", usersData.users);
      console.log("Setting initial users count:", usersData.users.length);
      setUsers(usersData.users);
    }
  }, [usersData]);

  // Debug current state
  useEffect(() => {
    console.log("Current messages state:", messages);
  }, [messages]);

  useEffect(() => {
    console.log("Current users state:", users);
  }, [users]);

  if (messagesLoading || usersLoading) {
    return <div style={{ padding: "20px" }}>Loading chat...</div>;
  }

  if (messagesError) {
    console.error("Messages query error:", messagesError);
    return (
      <div style={{ padding: "20px", color: "red" }}>
        Error loading messages: {messagesError.message}
      </div>
    );
  }

  if (usersError) {
    console.error("Users query error:", usersError);
    return (
      <div style={{ padding: "20px", color: "red" }}>
        Error loading users: {usersError.message}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        height: "80vh",
        border: "1px solid #ddd",
        borderRadius: "8px",
        margin: "20px 0",
      }}
    >
      {/* Chat Messages Section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #ddd",
        }}
      >
        <div
          style={{
            padding: "15px",
            borderBottom: "1px solid #ddd",
            backgroundColor: "#f8f9fa",
            fontWeight: "bold",
          }}
        >
          Anonymous Chat Room
        </div>

        <MessageList messages={messages} users={users} />

        <MessageForm currentUser={currentUser} />
      </div>

      {/* Users Sidebar */}
      <div style={{ width: "250px", backgroundColor: "#f8f9fa" }}>
        <UserList users={users} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default ChatRoom;

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [anonymousName, setAnonymousName] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);

  // Play notification sound (optional)
  const playNotificationSound = () => {
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmkfCEuFz/i7sVIDKIPM9tuGOQgaUa3r4qhJGQ0tgdzy2Ck9');
      audio.volume = 0.1;
      audio.play().catch(() => {}); // Ignore errors in case audio is blocked
    } catch (error) {
      // Silently ignore audio errors
    }
  };

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Connection events
    newSocket.on('connect', () => {
      setConnected(true);
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      setConnected(false);
      console.log('Disconnected from server');
    });

    // Receive anonymous name
    newSocket.on('anonymous-name', (name) => {
      setAnonymousName(name);
      setIsLoading(false);
    });

    // Room events (now just for the global room)
    newSocket.on('room-joined', (data) => {
      setMessages(data.messages || []);
      setUserCount(data.userCount);
      setIsLoading(false);
      
      // Add welcome message if it's the user's first time
      if (data.messages.length === 0) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now(),
            type: 'system',
            text: 'Welcome to the Chat! Start chatting with people from around the world! ',
            timestamp: new Date().toISOString()
          }]);
        }, 1000);
      }
    });

    newSocket.on('user-count', (count) => {
      setUserCount(count);
    });

    // Message events
    newSocket.on('receive-message', (message) => {
      setMessages(prev => [...prev, message]);
      // Play notification sound for messages from others
      setAnonymousName(currentName => {
        if (message.name !== currentName && currentName) {
          playNotificationSound();
        }
        return currentName;
      });
    });

    newSocket.on('user-joined', (data) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'system',
        text: data.message,
        timestamp: new Date().toISOString()
      }]);
    });

    newSocket.on('user-left', (data) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'system',
        text: data.message,
        timestamp: new Date().toISOString()
      }]);
    });

    // Typing events
    newSocket.on('user-typing', (userName) => {
      setTypingUsers(prev => {
        if (!prev.includes(userName)) {
          return [...prev, userName];
        }
        return prev;
      });
    });

    newSocket.on('user-stop-typing', (userName) => {
      setTypingUsers(prev => prev.filter(user => user !== userName));
    });

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a message
  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && newMessage.trim()) {
      socket.emit('send-message', { message: newMessage.trim() });
      setNewMessage('');
      // Stop typing indicator
      socket.emit('stop-typing');
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      // Focus back on input
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  // Handle typing
  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    if (socket) {
      socket.emit('typing');
      
      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Set new timeout to stop typing
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('stop-typing');
      }, 1000);
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="chat-app">
      {/* Connection Status */}
      <div className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
        {connected ? 'Connected' : 'Disconnected'}
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Anonymous Chat</h2>
        
        {/* User Info */}
        <div className="user-info">
          <h3>You are:</h3>
          <p className={isLoading ? 'loading' : ''}>
            {isLoading ? 'Generating your name...' : anonymousName || 'Loading...'}
          </p>
        </div>

        {/* Chat Info */}
        <div className="room-section">
          <h3>Global Chat Room</h3>
          <p>
            Everyone joins the same chat room automatically!
          </p>
          <div className="user-count-card">
            <div className="user-count-number">
              {userCount}
            </div>
            <div className="user-count-text">
              {userCount === 1 ? 'user online' : 'users online'}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="chat-container">
        {/* Chat Header */}
        <div className="chat-header">
          <h2>Global Chat</h2>
          <p>{userCount} user{userCount !== 1 ? 's' : ''} online</p>
        </div>

        {/* Messages */}
        <div className="messages-container">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${
                message.type === 'system' ? 'system' : 
                message.name === anonymousName ? 'user' : 'other'
              }`}
            >
              {message.type !== 'system' && (
                <div className="message-header">
                  <span className="message-name">{message.name}</span>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
              )}
              <div className="message-text">{message.text}</div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {typingUsers.length > 0 && (
            <div className="typing-indicator">
              {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="message-input-container">
          <form onSubmit={sendMessage} className="message-input">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={handleTyping}
              disabled={!connected}
              autoFocus
            />
            <button 
              type="submit" 
              disabled={!connected || !newMessage.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;

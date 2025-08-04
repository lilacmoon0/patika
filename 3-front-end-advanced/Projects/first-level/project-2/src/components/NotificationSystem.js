import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NotificationContainer = styled.div`
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 10000;
  max-width: 400px;
`;

const NotificationItem = styled.div`
  background: ${props => 
    props.type === 'success' ? 'linear-gradient(45deg, #4CAF50, #8BC34A)' :
    props.type === 'error' ? 'linear-gradient(45deg, #F44336, #FF7043)' :
    'linear-gradient(45deg, #2196F3, #64B5F6)'
  };
  color: white;
  padding: 16px 20px;
  border-radius: 25px;
  font-weight: 600;
  margin-bottom: 10px;
  animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 10px;
  
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

const Icon = styled.span`
  font-size: 1.2rem;
`;

let notificationId = 0;

// Global notification system
const notificationListeners = new Set();
let notifications = [];

export const showNotification = (message, type = 'info') => {
  const id = ++notificationId;
  const notification = { id, message, type };
  
  notifications = [...notifications, notification];
  notificationListeners.forEach(listener => listener(notifications));
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notifications = notifications.filter(n => n.id !== id);
    notificationListeners.forEach(listener => listener(notifications));
  }, 3000);
};

export const NotificationSystem = () => {
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    const listener = (newNotifications) => {
      setNotificationList(newNotifications);
    };
    
    notificationListeners.add(listener);
    
    return () => {
      notificationListeners.delete(listener);
    };
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <NotificationContainer>
      {notificationList.map(notification => (
        <NotificationItem key={notification.id} type={notification.type}>
          <Icon>{getIcon(notification.type)}</Icon>
          {notification.message}
        </NotificationItem>
      ))}
    </NotificationContainer>
  );
};

export default NotificationSystem;

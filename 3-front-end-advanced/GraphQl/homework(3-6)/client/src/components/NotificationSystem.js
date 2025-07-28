import React, { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Drawer,
  List,
  Avatar,
  Space,
  notification,
} from "antd";
import {
  BellOutlined,
  CloseOutlined,
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useSubscription } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { 
  USER_ADDED_SUBSCRIPTION, 
  EVENT_ADDED_SUBSCRIPTION, 
  LOCATION_ADDED_SUBSCRIPTION 
} from "../pages/home/subscriptions";

export const NotificationSystem = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [notificationDrawerVisible, setNotificationDrawerVisible] = useState(false);

  // Subscribe to new users, events, and locations
  const { data: newUser } = useSubscription(USER_ADDED_SUBSCRIPTION);
  const { data: newEvent } = useSubscription(EVENT_ADDED_SUBSCRIPTION);
  const { data: newLocation } = useSubscription(LOCATION_ADDED_SUBSCRIPTION);

  // Handle new user notifications
  useEffect(() => {
    if (newUser?.userAdded) {
      const user = newUser.userAdded;
      const newNotification = {
        id: `user-${user.id}-${Date.now()}`,
        type: 'user',
        title: 'New User Joined!',
        description: `@${user.username} (${user.email}) has joined EventHub`,
        timestamp: new Date(),
        icon: <UserOutlined style={{ color: '#1890ff' }} />,
        data: user
      };
      setNotifications(prev => [newNotification, ...prev]);
      
      notification.success({
        message: 'New User Joined!',
        description: `Welcome @${user.username} to EventHub!`,
        icon: <UserOutlined style={{ color: '#1890ff' }} />,
        placement: 'topRight',
        duration: 4,
      });
    }
  }, [newUser]);

  // Handle new event notifications
  useEffect(() => {
    if (newEvent?.eventAdded) {
      const event = newEvent.eventAdded;
      const newNotification = {
        id: `event-${event.id}-${Date.now()}`,
        type: 'event',
        title: 'New Event Created!',
        description: `"${event.title}" by @${event.user?.username || 'Unknown'} on ${event.date}`,
        timestamp: new Date(),
        icon: <CalendarOutlined style={{ color: '#52c41a' }} />,
        data: event
      };
      setNotifications(prev => [newNotification, ...prev]);
      
      notification.success({
        message: 'New Event Created!',
        description: `"${event.title}" is now available!`,
        icon: <CalendarOutlined style={{ color: '#52c41a' }} />,
        placement: 'topRight',
        duration: 4,
      });
    }
  }, [newEvent]);

  // Handle new location notifications
  useEffect(() => {
    if (newLocation?.locationAdded) {
      const location = newLocation.locationAdded;
      const newNotification = {
        id: `location-${location.id}-${Date.now()}`,
        type: 'location',
        title: 'New Location Added!',
        description: `"${location.name}" is now available for events`,
        timestamp: new Date(),
        icon: <EnvironmentOutlined style={{ color: '#722ed1' }} />,
        data: location
      };
      setNotifications(prev => [newNotification, ...prev]);
      
      notification.success({
        message: 'New Location Added!',
        description: `"${location.name}" is now available!`,
        icon: <EnvironmentOutlined style={{ color: '#722ed1' }} />,
        placement: 'topRight',
        duration: 4,
      });
    }
  }, [newLocation]);

  return (
    <>
      <Badge count={notifications.length} size="small">
        <Button
          type="ghost"
          icon={<BellOutlined />}
          onClick={() => setNotificationDrawerVisible(true)}
          style={{
            color: "#fff",
            border: "none",
            fontSize: "16px",
          }}
        />
      </Badge>

      <Drawer
        title={
          <Space>
            <BellOutlined />
            Real-time Notifications
            <Badge count={notifications.length} size="small" />
          </Space>
        }
        placement="right"
        width={400}
        onClose={() => setNotificationDrawerVisible(false)}
        open={notificationDrawerVisible}
        extra={
          <Button
            icon={<CloseOutlined />}
            onClick={() => setNotifications([])}
            size="small"
          >
            Clear All
          </Button>
        }
      >
        {notifications.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px 0", color: "#999" }}>
            <BellOutlined style={{ fontSize: 48, marginBottom: 16 }} />
            <div>No new notifications</div>
            <div style={{ fontSize: "12px", marginTop: 8 }}>
              You'll see real-time updates here when new users, events, or locations are added.
            </div>
          </div>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={(item) => (
              <List.Item
                style={{
                  borderBottom: "1px solid #f0f0f0",
                  padding: "12px 0",
                }}
                actions={[
                  <Button
                    type="link"
                    size="small"
                    onClick={() => {
                      if (item.type === 'user') navigate('/users');
                      else if (item.type === 'event') navigate('/events');
                      else if (item.type === 'location') navigate('/locations');
                      setNotificationDrawerVisible(false);
                    }}
                  >
                    View
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar 
                      style={{
                        backgroundColor: 
                          item.type === 'user' ? '#1890ff' :
                          item.type === 'event' ? '#52c41a' : '#722ed1'
                      }}
                      icon={item.icon}
                    />
                  }
                  title={item.title}
                  description={
                    <div>
                      <div style={{ marginBottom: 4 }}>{item.description}</div>
                      <div style={{ fontSize: "11px", color: "#999" }}>
                        {item.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Drawer>
    </>
  );
};

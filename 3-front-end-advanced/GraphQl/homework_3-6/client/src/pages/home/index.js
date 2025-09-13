import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Space,
  Button,
  Spin,
  Menu,
  notification,
  Badge,
  List,
  Avatar,
  Drawer,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  BellOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSubscription, useQuery, gql } from "@apollo/client";
import { GetStats } from "./queries";
import {
  USER_ADDED_SUBSCRIPTION,
  EVENT_ADDED_SUBSCRIPTION,
  LOCATION_ADDED_SUBSCRIPTION,
  USER_DELETED_SUBSCRIPTION,
  EVENT_DELETED_SUBSCRIPTION,
  LOCATION_DELETED_SUBSCRIPTION,
} from "./subscriptions";

// Queries for recent data
const GET_RECENT_USERS = gql`
  query GetUsers {
    users {
      id
      username
      email
    }
  }
`;

const GET_RECENT_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      desc
      date
      from
      to
      user {
        username
      }
      location {
        name
      }
    }
  }
`;

const GET_RECENT_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      desc
      lat
      lng
    }
  }
`;

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export const Home = () => {
  const navigate = useNavigate();
  const statsData = GetStats();
  const [notifications, setNotifications] = useState([]);
  const [notificationDrawerVisible, setNotificationDrawerVisible] =
    useState(false);

  // Fetch recent data
  const {
    data: recentUsersData,
    loading: usersLoading,
    refetch: refetchUsers,
  } = useQuery(GET_RECENT_USERS);
  const {
    data: recentEventsData,
    loading: eventsLoading,
    refetch: refetchEvents,
  } = useQuery(GET_RECENT_EVENTS);
  const {
    data: recentLocationsData,
    loading: locationsLoading,
    refetch: refetchLocations,
  } = useQuery(GET_RECENT_LOCATIONS);

  // Test mutation
  // Subscribe to new users
  const {
    data: newUser,
    loading: userLoading,
    error: userError,
  } = useSubscription(USER_ADDED_SUBSCRIPTION);
  const {
    data: newEvent,
    loading: eventLoading,
    error: eventError,
  } = useSubscription(EVENT_ADDED_SUBSCRIPTION);
  const {
    data: newLocation,
    loading: locationLoading,
    error: locationError,
  } = useSubscription(LOCATION_ADDED_SUBSCRIPTION);

  // Subscribe to deletions
  const {
    data: deletedUser,
    loading: userDeleteLoading,
    error: userDeleteError,
  } = useSubscription(USER_DELETED_SUBSCRIPTION);
  const {
    data: deletedEvent,
    loading: eventDeleteLoading,
    error: eventDeleteError,
  } = useSubscription(EVENT_DELETED_SUBSCRIPTION);
  const {
    data: deletedLocation,
    loading: locationDeleteLoading,
    error: locationDeleteError,
  } = useSubscription(LOCATION_DELETED_SUBSCRIPTION);

  // Debug subscription status
  useEffect(() => {
    console.log("Subscription Status:", {
      userLoading,
      userError: userError?.message,
      eventLoading,
      eventError: eventError?.message,
      locationLoading,
      locationError: locationError?.message,
    });
  }, [
    userLoading,
    userError,
    eventLoading,
    eventError,
    locationLoading,
    locationError,
  ]);

  // Handle new user notifications
  useEffect(() => {
    if (newUser?.userAdded) {
      const user = newUser.userAdded;
      const newNotification = {
        id: `user-${user.id}-${Date.now()}`,
        type: "user",
        title: "New User Joined!",
        description: `@${user.username} (${user.email}) has joined EventHub`,
        timestamp: new Date(),
        icon: <UserOutlined style={{ color: "#1890ff" }} />,
        data: user,
      };
      setNotifications((prev) => [newNotification, ...prev]);

      // Refetch users data to update the Recently Added section
      refetchUsers();

      notification.success({
        message: "New User Joined!",
        description: `Welcome @${user.username} to EventHub!`,
        icon: <UserOutlined style={{ color: "#1890ff" }} />,
        placement: "topRight",
        duration: 4,
      });
    }
  }, [newUser, refetchUsers]);

  // Handle new event notifications
  useEffect(() => {
    if (newEvent?.eventAdded) {
      const event = newEvent.eventAdded;
      const newNotification = {
        id: `event-${event.id}-${Date.now()}`,
        type: "event",
        title: "New Event Created!",
        description: `"${event.title}" by @${
          event.user?.username || "Unknown"
        } on ${event.date}`,
        timestamp: new Date(),
        icon: <CalendarOutlined style={{ color: "#52c41a" }} />,
        data: event,
      };
      setNotifications((prev) => [newNotification, ...prev]);

      // Refetch events data to update the Recently Added section
      refetchEvents();

      notification.success({
        message: "New Event Created!",
        description: `"${event.title}" is now available!`,
        icon: <CalendarOutlined style={{ color: "#52c41a" }} />,
        placement: "topRight",
        duration: 4,
      });
    }
  }, [newEvent, refetchEvents]);

  // Handle new location notifications
  useEffect(() => {
    if (newLocation?.locationAdded) {
      const location = newLocation.locationAdded;
      const newNotification = {
        id: `location-${location.id}-${Date.now()}`,
        type: "location",
        title: "New Location Added!",
        description: `"${location.name}" is now available for events`,
        timestamp: new Date(),
        icon: <EnvironmentOutlined style={{ color: "#722ed1" }} />,
        data: location,
      };
      setNotifications((prev) => [newNotification, ...prev]);

      // Refetch locations data to update the Recently Added section
      refetchLocations();

      notification.success({
        message: "New Location Added!",
        description: `"${location.name}" is now available!`,
        icon: <EnvironmentOutlined style={{ color: "#722ed1" }} />,
        placement: "topRight",
        duration: 4,
      });
    }
  }, [newLocation, refetchLocations]);

  // Handle user deletion notifications
  useEffect(() => {
    if (deletedUser?.userDeleted) {
      const user = deletedUser.userDeleted;
      const newNotification = {
        id: `user-deleted-${user.id}-${Date.now()}`,
        type: "user-deleted",
        title: "User Deleted",
        description: `User @${user.username} (${user.email}) has been removed`,
        timestamp: new Date(),
        icon: <UserOutlined style={{ color: "#ff4d4f" }} />,
        data: user,
      };
      setNotifications((prev) => [newNotification, ...prev]);

      // Refetch users data to update the Recently Added section
      refetchUsers();

      notification.error({
        message: "User Deleted",
        description: `User @${user.username} has been removed from EventHub`,
        icon: <UserOutlined style={{ color: "#ff4d4f" }} />,
        placement: "topRight",
        duration: 4,
      });
    }
  }, [deletedUser, refetchUsers]);

  // Handle event deletion notifications
  useEffect(() => {
    if (deletedEvent?.eventDeleted) {
      const event = deletedEvent.eventDeleted;
      const newNotification = {
        id: `event-deleted-${event.id}-${Date.now()}`,
        type: "event-deleted",
        title: "Event Deleted",
        description: `Event "${event.title}" has been cancelled and removed`,
        timestamp: new Date(),
        icon: <CalendarOutlined style={{ color: "#ff4d4f" }} />,
        data: event,
      };
      setNotifications((prev) => [newNotification, ...prev]);

      // Refetch events data to update the Recently Added section
      refetchEvents();

      notification.error({
        message: "Event Deleted",
        description: `Event "${event.title}" has been cancelled and removed`,
        icon: <CalendarOutlined style={{ color: "#ff4d4f" }} />,
        placement: "topRight",
        duration: 4,
      });
    }
  }, [deletedEvent, refetchEvents]);

  // Handle location deletion notifications
  useEffect(() => {
    if (deletedLocation?.locationDeleted) {
      const location = deletedLocation.locationDeleted;
      const newNotification = {
        id: `location-deleted-${location.id}-${Date.now()}`,
        type: "location-deleted",
        title: "Location Deleted",
        description: `Location "${location.name}" has been removed`,
        timestamp: new Date(),
        icon: <EnvironmentOutlined style={{ color: "#ff4d4f" }} />,
        data: location,
      };
      setNotifications((prev) => [newNotification, ...prev]);

      // Refetch locations data to update the Recently Added section
      refetchLocations();

      notification.error({
        message: "Location Deleted",
        description: `Location "${location.name}" has been removed`,
        icon: <EnvironmentOutlined style={{ color: "#ff4d4f" }} />,
        placement: "topRight",
        duration: 4,
      });
    }
  }, [deletedLocation, refetchLocations]);

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Home",
      onClick: () => navigate("/"),
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: "Users",
      onClick: () => navigate("/users"),
    },
    {
      key: "events",
      icon: <CalendarOutlined />,
      label: "Events",
      onClick: () => navigate("/events"),
    },
    {
      key: "locations",
      icon: <EnvironmentOutlined />,
      label: "Locations",
      onClick: () => navigate("/locations"),
    },
  ];

  // Handle loading state
  if (statsData === 1) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            background: "#001529",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                marginRight: "20px",
                lineHeight: "64px",
              }}
            >
              EventHub
            </div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["home"]}
              items={menuItems}
              style={{
                lineHeight: "64px",
                backgroundColor: "transparent",
                border: "none",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
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
          </div>
        </Header>
        <Content
          style={{
            padding: "0 50px",
            marginTop: 64,
            background: "#f0f2f5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  // Get counts from GraphQL data or default to 0
  const userCount = statsData && statsData.users ? statsData.users.length : 0;
  const eventCount =
    statsData && statsData.events ? statsData.events.length : 0;
  const locationCount =
    statsData && statsData.locations ? statsData.locations.length : 0;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          background: "#001529",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              marginRight: "20px",
              lineHeight: "64px",
            }}
          >
            EventHub
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            items={menuItems}
            style={{
              lineHeight: "64px",
              backgroundColor: "transparent",
              border: "none",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
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
        </div>
      </Header>

      <Content
        style={{
          padding: "0 50px",
          marginTop: 64,
          background: "#f0f2f5",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: "calc(100vh - 128px)",
            marginTop: 24,
            borderRadius: 8,
          }}
        >
          <Row justify="center" style={{ marginBottom: 40 }}>
            <Col span={24} style={{ textAlign: "center" }}>
              <Title level={1} style={{ color: "#001529", marginBottom: 16 }}>
                Welcome to EventHub
              </Title>
              <Paragraph
                style={{
                  fontSize: "18px",
                  color: "#666",
                  maxWidth: 800,
                  margin: "0 auto",
                }}
              >
                Your comprehensive platform for managing events, users, and
                locations. Discover amazing events, connect with people, and
                explore wonderful places.
              </Paragraph>
            </Col>
          </Row>

          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} sm={12} lg={8}>
              <Card
                hoverable
                style={{ textAlign: "center", height: "100%" }}
                cover={
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      height: 120,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <UserOutlined style={{ fontSize: 48, color: "#fff" }} />
                  </div>
                }
              >
                <Card.Meta
                  title={<Title level={4}>Users</Title>}
                  description={`Manage and view all ${userCount} registered users in the system. Connect with other event enthusiasts and build your network.`}
                />
                <Button
                  type="primary"
                  style={{ marginTop: 16 }}
                  onClick={() => navigate("/users")}
                >
                  View Users
                </Button>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card
                hoverable
                style={{ textAlign: "center", height: "100%" }}
                cover={
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                      height: 120,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CalendarOutlined style={{ fontSize: 48, color: "#fff" }} />
                  </div>
                }
              >
                <Card.Meta
                  title={<Title level={4}>Events</Title>}
                  description={`Discover ${eventCount} exciting events happening around you. Create, manage, and participate in various activities and gatherings.`}
                />
                <Button
                  type="primary"
                  style={{ marginTop: 16 }}
                  onClick={() => navigate("/events")}
                >
                  View Events
                </Button>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card
                hoverable
                style={{ textAlign: "center", height: "100%" }}
                cover={
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                      height: 120,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <EnvironmentOutlined
                      style={{ fontSize: 48, color: "#fff" }}
                    />
                  </div>
                }
              >
                <Card.Meta
                  title={<Title level={4}>Locations</Title>}
                  description={`Explore ${locationCount} amazing venues and locations. Find the perfect spot for your next event or discover new places to visit.`}
                />
                <Button
                  type="primary"
                  style={{ marginTop: 16 }}
                  onClick={() => navigate("/locations")}
                >
                  View Locations
                </Button>
              </Card>
            </Col>
          </Row>

          <Row justify="center" style={{ marginTop: 60 }}>
            <Col span={24} style={{ textAlign: "center" }}>
              <Title level={3} style={{ color: "#001529" }}>
                Features
              </Title>
              <Row gutter={[32, 32]} style={{ marginTop: 32 }}>
                <Col xs={24} md={8}>
                  <Space direction="vertical" align="center">
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: "#52c41a",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <UserOutlined style={{ fontSize: 24, color: "#fff" }} />
                    </div>
                    <Title level={4}>User Management</Title>
                    <Paragraph style={{ textAlign: "center" }}>
                      Comprehensive user profiles and management system
                    </Paragraph>
                  </Space>
                </Col>
                <Col xs={24} md={8}>
                  <Space direction="vertical" align="center">
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: "#1890ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CalendarOutlined
                        style={{ fontSize: 24, color: "#fff" }}
                      />
                    </div>
                    <Title level={4}>Event Planning</Title>
                    <Paragraph style={{ textAlign: "center" }}>
                      Create and manage events with ease and efficiency
                    </Paragraph>
                  </Space>
                </Col>
                <Col xs={24} md={8}>
                  <Space direction="vertical" align="center">
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: "#722ed1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <EnvironmentOutlined
                        style={{ fontSize: 24, color: "#fff" }}
                      />
                    </div>
                    <Title level={4}>Location Discovery</Title>
                    <Paragraph style={{ textAlign: "center" }}>
                      Find and explore the best venues for your events
                    </Paragraph>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Recently Added Items Section */}
          <Row justify="center" style={{ marginTop: 80 }}>
            <Col span={24}>
              <Title
                level={2}
                style={{
                  textAlign: "center",
                  color: "#001529",
                  marginBottom: 40,
                }}
              >
                <BellOutlined style={{ marginRight: 12 }} />
                Recently Added
              </Title>

              <Row gutter={[24, 24]}>
                {/* Recently Added Users */}
                <Col xs={24} lg={8}>
                  <Card
                    title={
                      <Space>
                        <UserOutlined style={{ color: "#1890ff" }} />
                        New Users
                      </Space>
                    }
                    headStyle={{
                      background: "#f6f8fa",
                      borderBottom: "1px solid #d1d9e0",
                    }}
                    style={{ height: "100%" }}
                  >
                    <List
                      size="small"
                      loading={usersLoading}
                      dataSource={(recentUsersData?.users || [])
                        .slice(-5)
                        .reverse()}
                      locale={{ emptyText: "No users found" }}
                      renderItem={(user) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                icon={<UserOutlined />}
                                style={{ backgroundColor: "#1890ff" }}
                              />
                            }
                            title={user.username}
                            description={
                              <Space direction="vertical" size="xs">
                                <span style={{ color: "#666" }}>
                                  {user.email}
                                </span>
                                <span
                                  style={{ fontSize: "12px", color: "#999" }}
                                >
                                  ID: {user.id}
                                </span>
                              </Space>
                            }
                          />
                        </List.Item>
                      )}
                    />
                    <Button
                      type="link"
                      style={{ padding: 0, marginTop: 8 }}
                      onClick={() => navigate("/users")}
                    >
                      View all users →
                    </Button>
                  </Card>
                </Col>

                {/* Recently Added Events */}
                <Col xs={24} lg={8}>
                  <Card
                    title={
                      <Space>
                        <CalendarOutlined style={{ color: "#52c41a" }} />
                        New Events
                      </Space>
                    }
                    headStyle={{
                      background: "#f6f8fa",
                      borderBottom: "1px solid #d1d9e0",
                    }}
                    style={{ height: "100%" }}
                  >
                    <List
                      size="small"
                      loading={eventsLoading}
                      dataSource={(recentEventsData?.events || [])
                        .slice(-5)
                        .reverse()}
                      locale={{ emptyText: "No events found" }}
                      renderItem={(event) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                icon={<CalendarOutlined />}
                                style={{ backgroundColor: "#52c41a" }}
                              />
                            }
                            title={event.title}
                            description={
                              <Space direction="vertical" size="xs">
                                <span style={{ color: "#666" }}>
                                  {event.date} • {event.from}-{event.to}
                                </span>
                                <span
                                  style={{ fontSize: "12px", color: "#999" }}
                                >
                                  By: {event.user?.username || "Unknown"}
                                </span>
                              </Space>
                            }
                          />
                        </List.Item>
                      )}
                    />
                    <Button
                      type="link"
                      style={{ padding: 0, marginTop: 8 }}
                      onClick={() => navigate("/events")}
                    >
                      View all events →
                    </Button>
                  </Card>
                </Col>

                {/* Recently Added Locations */}
                <Col xs={24} lg={8}>
                  <Card
                    title={
                      <Space>
                        <EnvironmentOutlined style={{ color: "#722ed1" }} />
                        New Locations
                      </Space>
                    }
                    headStyle={{
                      background: "#f6f8fa",
                      borderBottom: "1px solid #d1d9e0",
                    }}
                    style={{ height: "100%" }}
                  >
                    <List
                      size="small"
                      loading={locationsLoading}
                      dataSource={(recentLocationsData?.locations || [])
                        .slice(-5)
                        .reverse()}
                      locale={{ emptyText: "No locations found" }}
                      renderItem={(location) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                icon={<EnvironmentOutlined />}
                                style={{ backgroundColor: "#722ed1" }}
                              />
                            }
                            title={location.name}
                            description={
                              <Space direction="vertical" size="xs">
                                <span style={{ color: "#666" }}>
                                  {location.lat}, {location.lng}
                                </span>
                                <span
                                  style={{ fontSize: "12px", color: "#999" }}
                                >
                                  ID: {location.id}
                                </span>
                              </Space>
                            }
                          />
                        </List.Item>
                      )}
                    />
                    <Button
                      type="link"
                      style={{ padding: 0, marginTop: 8 }}
                      onClick={() => navigate("/locations")}
                    >
                      View all locations →
                    </Button>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Content>

      <Footer
        style={{ textAlign: "center", background: "#001529", color: "#fff" }}
      >
        EventHub ©2025 Created with Ant Design
      </Footer>

      {/* Notification Drawer */}
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
          <div
            style={{ textAlign: "center", padding: "50px 0", color: "#999" }}
          >
            <BellOutlined style={{ fontSize: 48, marginBottom: 16 }} />
            <div>No new notifications</div>
            <div style={{ fontSize: "12px", marginTop: 8 }}>
              You'll see real-time updates here when new users, events, or
              locations are added.
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
                      if (item.type === "user") navigate("/users");
                      else if (item.type === "event") navigate("/events");
                      else if (item.type === "location") navigate("/locations");
                      setNotificationDrawerVisible(false);
                    }}
                  >
                    View
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor:
                          item.type === "user"
                            ? "#1890ff"
                            : item.type === "event"
                            ? "#52c41a"
                            : "#722ed1",
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
    </Layout>
  );
};

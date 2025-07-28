import React from "react";
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Tag,
  Button,
  Space,
  Badge,
  Statistic,
  Spin,
  Alert,
  Menu,
} from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  StarOutlined,
  EnvironmentOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { GetEvents } from "./queries";
import { NotificationSystem } from "../../components/NotificationSystem";
import { CreateEventButton } from "../../components/CreateEventButton";
import { DeleteEventButton } from "../../components/DeleteEventButton";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

export const Events = () => {
  const navigate = useNavigate();
  const eventsData = GetEvents();

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
  if (eventsData === 1) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            background: "#001529",
          }}
        >
          <div
            style={{
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              float: "left",
              marginRight: "20px",
              lineHeight: "64px",
            }}
          >
            EventHub
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["events"]}
            items={menuItems}
            style={{ lineHeight: "64px" }}
          />
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

  // Handle error state
  if (eventsData === 0) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            background: "#001529",
          }}
        >
          <div
            style={{
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              float: "left",
              marginRight: "20px",
              lineHeight: "64px",
            }}
          >
            EventHub
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["events"]}
            items={menuItems}
            style={{ lineHeight: "64px" }}
          />
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
            <Alert
              message="Error loading events"
              description="There was an error loading the events data. Please try again later."
              type="error"
              showIcon
            />
          </div>
        </Content>
      </Layout>
    );
  }

  const events = eventsData.events || [];

  // Since we don't have status or participants from GraphQL, we'll show basic info
  const currentDate = new Date().toISOString().split("T")[0];
  const upcomingEvents = events.filter((event) => event.date >= currentDate);

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
            }}
          >
            EventHub
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["events"]}
            items={menuItems}
            style={{ lineHeight: "64px", border: "none" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <CreateEventButton size="small" />
          <DeleteEventButton size="small" />
          <NotificationSystem />
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
                <CalendarOutlined style={{ marginRight: 12 }} />
                Discover Events
              </Title>
              <Paragraph
                style={{
                  fontSize: "18px",
                  color: "#666",
                  maxWidth: 800,
                  margin: "0 auto",
                }}
              >
                Find exciting events happening in your area. From tech
                conferences to art workshops, there's something for everyone in
                our vibrant community.
              </Paragraph>
            </Col>
          </Row>

          <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Total Events"
                  value={events.length}
                  prefix={<CalendarOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Upcoming Events"
                  value={upcomingEvents.length}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Total Locations"
                  value={events.length}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: "#722ed1" }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            {events.map((event) => (
              <Col xs={24} lg={12} key={event.id}>
                <Badge.Ribbon
                  text={
                    new Date(event.date) >= new Date()
                      ? "Upcoming"
                      : "Past Event"
                  }
                  color={new Date(event.date) >= new Date() ? "green" : "gray"}
                >
                  <Card
                    hoverable
                    style={{ height: "100%" }}
                    cover={
                      <div
                        style={{
                          background: `linear-gradient(135deg, ${
                            new Date(event.date) >= new Date()
                              ? "#f093fb 0%, #f5576c 100%"
                              : "#bfbfbf 0%, #8c8c8c 100%"
                          })`,
                          height: 120,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CalendarOutlined
                          style={{ fontSize: 48, color: "#fff" }}
                        />
                      </div>
                    }
                    actions={[
                      <Button type="link" icon={<StarOutlined />}>
                        {new Date(event.date) >= new Date()
                          ? "Join Event"
                          : "View Details"}
                      </Button>,
                      <Button type="link" icon={<TeamOutlined />}>
                        Event Details
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Space
                          direction="vertical"
                          size="small"
                          style={{ width: "100%" }}
                        >
                          <Title level={4} style={{ margin: 0 }}>
                            {event.title}
                          </Title>
                          <Tag color="blue">Event</Tag>
                        </Space>
                      }
                      description={
                        <Space
                          direction="vertical"
                          size="small"
                          style={{ width: "100%" }}
                        >
                          <Paragraph
                            ellipsis={{ rows: 2 }}
                            style={{ margin: 0, color: "#666" }}
                          >
                            {event.desc}
                          </Paragraph>
                          <Space
                            direction="vertical"
                            size="xs"
                            style={{ width: "100%", marginTop: 12 }}
                          >
                            <Text type="secondary">
                              <CalendarOutlined style={{ marginRight: 8 }} />
                              {event.date} • {event.from} - {event.to}
                            </Text>
                            <Text type="secondary">
                              <EnvironmentOutlined style={{ marginRight: 8 }} />
                              {event.location
                                ? event.location.name
                                : "Location TBD"}
                            </Text>
                            <Text type="secondary">
                              <UserOutlined style={{ marginRight: 8 }} />
                              Organized by @
                              {event.user ? event.user.username : "Unknown"}
                            </Text>
                          </Space>
                        </Space>
                      }
                    />
                  </Card>
                </Badge.Ribbon>
              </Col>
            ))}
          </Row>
        </div>
      </Content>

      <Footer
        style={{ textAlign: "center", background: "#001529", color: "#fff" }}
      >
        EventHub ©2025 Created with Ant Design
      </Footer>
    </Layout>
  );
};

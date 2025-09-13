import React from "react";
import {
  Layout,
  Menu,
  Typography,
  Card,
  Row,
  Col,
  Avatar,
  Button,
  Space,
  Divider,
  Spin,
  Alert,
} from "antd";
import {
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  MailOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { GetUsers } from "./queries";
import { NotificationSystem } from "../../components/NotificationSystem";
import { CreateUserButton } from "../../components/CreateUserButton";
import { DeleteUserButton } from "../../components/DeleteUserButton";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

export const Users = () => {
  const navigate = useNavigate();
  const userData = GetUsers();

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
  if (userData === 1) {
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
            defaultSelectedKeys={["users"]}
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
  if (userData === 0) {
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
            defaultSelectedKeys={["users"]}
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
              message="Error loading users"
              description="There was an error loading the users data. Please try again later."
              type="error"
              showIcon
            />
          </div>
        </Content>
      </Layout>
    );
  }

  const users = userData.users || [];

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
            defaultSelectedKeys={["users"]}
            items={menuItems}
            style={{ lineHeight: "64px", border: "none" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <CreateUserButton size="small" />
          <DeleteUserButton size="small" />
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
                <UserOutlined style={{ marginRight: 12 }} />
                Users Directory
              </Title>
              <Paragraph
                style={{
                  fontSize: "18px",
                  color: "#666",
                  maxWidth: 800,
                  margin: "0 auto",
                }}
              >
                Discover and connect with fellow event enthusiasts. Browse
                through our community of active users and see who's organizing
                amazing events.
              </Paragraph>
            </Col>
          </Row>

          <Row style={{ marginBottom: 32 }}>
            <Col span={24}>
              <Card
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                }}
              >
                <Row align="middle">
                  <Col xs={24} sm={16}>
                    <Title level={3} style={{ color: "#fff", margin: 0 }}>
                      <TeamOutlined style={{ marginRight: 8 }} />
                      Community Stats
                    </Title>
                    <Text style={{ color: "#fff", fontSize: "16px" }}>
                      Join our growing community of event creators and
                      participants
                    </Text>
                  </Col>
                  <Col xs={24} sm={8} style={{ textAlign: "right" }}>
                    <div style={{ color: "#fff" }}>
                      <Title level={2} style={{ color: "#fff", margin: 0 }}>
                        {users.length}+
                      </Title>
                      <Text style={{ color: "#fff" }}>Active Users</Text>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            {users.map((user) => (
              <Col xs={24} sm={12} lg={8} key={user.id}>
                <Card
                  hoverable
                  style={{ height: "100%" }}
                  actions={[
                    <Button type="link" icon={<MailOutlined />}>
                      Contact
                    </Button>,
                    <Button type="link" icon={<CalendarOutlined />}>
                      Events
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    avatar={
                      <Avatar
                        size={64}
                        icon={<UserOutlined />}
                        style={{
                          background: `linear-gradient(135deg, ${
                            [
                              "#667eea",
                              "#f093fb",
                              "#4facfe",
                              "#43e97b",
                              "#fa709a",
                            ][parseInt(user.id) % 5]
                          } 0%, ${
                            [
                              "#764ba2",
                              "#f5576c",
                              "#00f2fe",
                              "#40e0d0",
                              "#fecaca",
                            ][parseInt(user.id) % 5]
                          } 100%)`,
                        }}
                      />
                    }
                    title={
                      <Title level={4} style={{ margin: 0, marginTop: 8 }}>
                        @{user.username}
                      </Title>
                    }
                    description={
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        <Text type="secondary">
                          <MailOutlined style={{ marginRight: 8 }} />
                          {user.email}
                        </Text>
                        <Divider style={{ margin: "8px 0" }} />
                        <Row justify="space-between">
                          <Col>
                            <Text strong>ID: {user.id}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              User ID
                            </Text>
                          </Col>
                          <Col>
                            <Text strong>@{user.username}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              Username
                            </Text>
                          </Col>
                        </Row>
                      </Space>
                    }
                  />
                </Card>
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

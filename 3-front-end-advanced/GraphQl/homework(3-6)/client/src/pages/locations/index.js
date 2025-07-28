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
  Rate,
  Statistic,
  Spin,
  Alert,
  Menu,
} from "antd";
import {
  EnvironmentOutlined,
  StarOutlined,
  CompassOutlined,
  GlobalOutlined,
  CalendarOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { GetLocations } from "./queries";
import { NotificationSystem } from "../../components/NotificationSystem";
import { CreateLocationButton } from "../../components/CreateLocationButton";
import { DeleteLocationButton } from "../../components/DeleteLocationButton";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

export const Locations = () => {
  const navigate = useNavigate();
  const locationsData = GetLocations();

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
  if (locationsData === 1) {
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
            defaultSelectedKeys={["locations"]}
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
  if (locationsData === 0) {
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
            defaultSelectedKeys={["locations"]}
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
              message="Error loading locations"
              description="There was an error loading the locations data. Please try again later."
              type="error"
              showIcon
            />
          </div>
        </Content>
      </Layout>
    );
  }

  const locations = locationsData.locations || [];

  // Since GraphQL doesn't have capacity/rating, we'll show basic stats
  const avgLat = locations.length
    ? (
        locations.reduce((sum, location) => sum + location.lat, 0) /
        locations.length
      ).toFixed(4)
    : "0";
  const avgLng = locations.length
    ? (
        locations.reduce((sum, location) => sum + location.lng, 0) /
        locations.length
      ).toFixed(4)
    : "0";

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
            defaultSelectedKeys={["locations"]}
            items={menuItems}
            style={{ lineHeight: "64px", border: "none" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <CreateLocationButton size="small" />
          <DeleteLocationButton size="small" />
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
                <EnvironmentOutlined style={{ marginRight: 12 }} />
                Explore Locations
              </Title>
              <Paragraph
                style={{
                  fontSize: "18px",
                  color: "#666",
                  maxWidth: 800,
                  margin: "0 auto",
                }}
              >
                Discover amazing venues perfect for your next event. From modern
                conference centers to cozy bookstores, find the ideal space to
                bring your vision to life.
              </Paragraph>
            </Col>
          </Row>

          <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Total Locations"
                  value={locations.length}
                  prefix={<EnvironmentOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Average Latitude"
                  value={avgLat}
                  prefix={<GlobalOutlined />}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Average Longitude"
                  value={avgLng}
                  prefix={<StarOutlined />}
                  valueStyle={{ color: "#722ed1" }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            {locations.map((location) => (
              <Col xs={24} lg={12} key={location.id}>
                <Card
                  hoverable
                  style={{ height: "100%" }}
                  cover={
                    <div
                      style={{
                        background: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`,
                        height: 160,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <EnvironmentOutlined
                        style={{ fontSize: 48, color: "#fff", marginBottom: 8 }}
                      />
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        Location ID: {location.id}
                      </Text>
                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          background: "rgba(255,255,255,0.9)",
                          padding: "4px 8px",
                          borderRadius: 4,
                        }}
                      >
                        <Rate
                          disabled
                          defaultValue={4}
                          style={{ fontSize: 12 }}
                        />
                        <Text style={{ marginLeft: 4, fontSize: 12 }}>4.0</Text>
                      </div>
                    </div>
                  }
                  actions={[
                    <Button type="link" icon={<CompassOutlined />}>
                      View on Map
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
                          {location.name}
                        </Title>
                        <Space>
                          <Tag color="blue">Location</Tag>
                          <Text type="secondary">
                            <CalendarOutlined style={{ marginRight: 4 }} />
                            Available for events
                          </Text>
                        </Space>
                      </Space>
                    }
                    description={
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        <Paragraph
                          ellipsis={{ rows: 3 }}
                          style={{ margin: 0, color: "#666" }}
                        >
                          {location.desc}
                        </Paragraph>
                        <div style={{ marginTop: 12 }}>
                          <Text
                            strong
                            style={{ fontSize: "13px", color: "#666" }}
                          >
                            Coordinates:
                          </Text>
                          <div style={{ marginTop: 4 }}>
                            <Tag size="small" style={{ margin: "2px" }}>
                              Lat: {location.lat.toFixed(4)}
                            </Tag>
                            <Tag size="small" style={{ margin: "2px" }}>
                              Lng: {location.lng.toFixed(4)}
                            </Tag>
                          </div>
                        </div>
                        <div style={{ marginTop: 8 }}>
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            <EnvironmentOutlined style={{ marginRight: 4 }} />
                            ID: {location.id} • Available for booking
                          </Text>
                        </div>
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

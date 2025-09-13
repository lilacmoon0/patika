import React, { useState } from "react";
import { Button, Modal, List, Avatar, message, Select, Space } from "antd";
import { DeleteOutlined, EnvironmentOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery, gql } from "@apollo/client";

const DELETE_LOCATION_MUTATION = gql`
  mutation DeleteLocation($id: ID!) {
    deleteLocation(id: $id) {
      id
      name
      desc
      lat
      lng
    }
  }
`;

const GET_LOCATIONS_FOR_DELETE = gql`
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

export const DeleteLocationButton = ({ type = "primary", size = "middle", danger = true }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { data: locationsData, loading: locationsLoading } = useQuery(GET_LOCATIONS_FOR_DELETE);
  const [deleteLocation, { loading: deleteLoading }] = useMutation(DELETE_LOCATION_MUTATION);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedLocation(null);
  };

  const handleDelete = async () => {
    if (!selectedLocation) {
      message.warning("Please select a location to delete");
      return;
    }

    Modal.confirm({
      title: "Are you sure you want to delete this location?",
      icon: <ExclamationCircleOutlined />,
      content: `This will permanently delete location "${selectedLocation.name}" and cannot be undone.`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteLocation({
            variables: {
              id: selectedLocation.id,
            },
          });
          
          message.success(`Location "${selectedLocation.name}" deleted successfully!`);
          setIsModalVisible(false);
          setSelectedLocation(null);
        } catch (error) {
          message.error(`Failed to delete location: ${error.message}`);
        }
      },
    });
  };

  const locations = locationsData?.locations || [];

  return (
    <>
      <Button
        type={type}
        danger={danger}
        icon={<DeleteOutlined />}
        onClick={showModal}
        size={size}
      >
        Delete Location
      </Button>

      <Modal
        title="Delete Location"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            loading={deleteLoading}
            onClick={handleDelete}
            disabled={!selectedLocation}
          >
            Delete Location
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <div style={{ marginBottom: 16 }}>
            <strong>Select location to delete:</strong>
          </div>
          
          <Select
            style={{ width: "100%" }}
            placeholder="Choose a location to delete"
            loading={locationsLoading}
            value={selectedLocation?.id}
            onChange={(locationId) => {
              const location = locations.find(l => l.id === locationId);
              setSelectedLocation(location);
            }}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {locations.map((location) => (
              <Select.Option key={location.id} value={location.id}>
                {location.name}
              </Select.Option>
            ))}
          </Select>

          {selectedLocation && (
            <div style={{ 
              marginTop: 16, 
              padding: 12, 
              backgroundColor: "#fff2f0", 
              border: "1px solid #ffccc7",
              borderRadius: 6 
            }}>
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar 
                      icon={<EnvironmentOutlined />} 
                      style={{ backgroundColor: "#ff4d4f" }}
                    />
                  }
                  title={<span style={{ color: "#cf1322" }}>{selectedLocation.name}</span>}
                  description={
                    <Space direction="vertical" size="xs">
                      <span>{selectedLocation.desc}</span>
                      <span>Coordinates: {selectedLocation.lat}, {selectedLocation.lng}</span>
                    </Space>
                  }
                />
              </List.Item>
            </div>
          )}

          <div style={{ 
            padding: '12px', 
            backgroundColor: '#fff7e6', 
            borderRadius: '6px',
            marginTop: '12px',
            fontSize: '12px',
            color: '#d46b08'
          }}>
            ⚠️ <strong>Warning:</strong> This action cannot be undone. The location and all associated data will be permanently removed.
          </div>
        </Space>
      </Modal>
    </>
  );
};

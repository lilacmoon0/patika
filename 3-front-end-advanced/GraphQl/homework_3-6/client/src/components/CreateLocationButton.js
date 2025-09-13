import React, { useState } from "react";
import { Button, Modal, Form, Input, InputNumber, message } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useMutation, gql } from "@apollo/client";

const CREATE_LOCATION_MUTATION = gql`
  mutation CreateLocation($inputData: LocationInput!) {
    addNewLocation(inputData: $inputData) {
      id
      name
      desc
      lat
      lng
    }
  }
`;

export const CreateLocationButton = ({ type = "primary", size = "middle" }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [createLocation, { loading }] = useMutation(CREATE_LOCATION_MUTATION);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      await createLocation({
        variables: {
          inputData: {
            name: values.name,
            desc: values.desc,
            lat: values.lat,
            lng: values.lng,
          },
        },
      });
      
      message.success(`Location "${values.name}" created successfully!`);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error(`Failed to create location: ${error.message}`);
    }
  };

  return (
    <>
      <Button
        type={type}
        icon={<EnvironmentOutlined />}
        onClick={showModal}
        size={size}
      >
        Create Location
      </Button>

      <Modal
        title="Create New Location"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => form.submit()}
          >
            Create Location
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item
            name="name"
            label="Location Name"
            rules={[
              { required: true, message: "Please enter location name" },
              { min: 3, message: "Name must be at least 3 characters" },
            ]}
          >
            <Input placeholder="Enter location name" />
          </Form.Item>

          <Form.Item
            name="desc"
            label="Description"
            rules={[
              { required: true, message: "Please enter location description" },
            ]}
          >
            <Input.TextArea 
              rows={3} 
              placeholder="Enter location description" 
            />
          </Form.Item>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item
              name="lat"
              label="Latitude"
              style={{ flex: 1 }}
              rules={[
                { required: true, message: "Please enter latitude" },
                { type: 'number', min: -90, max: 90, message: "Latitude must be between -90 and 90" },
              ]}
            >
              <InputNumber 
                style={{ width: '100%' }}
                placeholder="e.g., 40.7128"
                step={0.0001}
                precision={4}
              />
            </Form.Item>

            <Form.Item
              name="lng"
              label="Longitude"
              style={{ flex: 1 }}
              rules={[
                { required: true, message: "Please enter longitude" },
                { type: 'number', min: -180, max: 180, message: "Longitude must be between -180 and 180" },
              ]}
            >
              <InputNumber 
                style={{ width: '100%' }}
                placeholder="e.g., -74.0060"
                step={0.0001}
                precision={4}
              />
            </Form.Item>
          </div>

          <div style={{ 
            padding: '12px', 
            backgroundColor: '#f6f8fa', 
            borderRadius: '6px',
            marginTop: '8px',
            fontSize: '12px',
            color: '#666'
          }}>
            💡 <strong>Tip:</strong> You can find coordinates by searching for a location on Google Maps, 
            right-clicking on the map, and selecting the coordinates that appear.
          </div>
        </Form>
      </Modal>
    </>
  );
};

import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useMutation, gql } from "@apollo/client";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($inputData: UserInput!) {
    createNewUser(inputData: $inputData) {
      id
      username
      email
    }
  }
`;

export const CreateUserButton = ({ type = "primary", size = "middle" }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      await createUser({
        variables: {
          inputData: {
            username: values.username,
            email: values.email,
          },
        },
      });
      
      message.success(`User "${values.username}" created successfully!`);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error(`Failed to create user: ${error.message}`);
    }
  };

  return (
    <>
      <Button
        type={type}
        icon={<UserAddOutlined />}
        onClick={showModal}
        size={size}
      >
        Create User
      </Button>

      <Modal
        title="Create New User"
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
            Create User
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
            name="username"
            label="Username"
            rules={[
              { required: true, message: "Please enter a username" },
              { min: 3, message: "Username must be at least 3 characters" },
            ]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter an email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

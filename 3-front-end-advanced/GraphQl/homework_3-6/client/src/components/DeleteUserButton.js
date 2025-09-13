import React, { useState } from "react";
import { Button, Modal, List, Avatar, message, Select, Space } from "antd";
import { DeleteOutlined, UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery, gql } from "@apollo/client";

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      username
      email
    }
  }
`;

const GET_USERS_FOR_DELETE = gql`
  query GetUsers {
    users {
      id
      username
      email
    }
  }
`;

export const DeleteUserButton = ({ type = "primary", size = "middle", danger = true }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: usersData, loading: usersLoading } = useQuery(GET_USERS_FOR_DELETE);
  const [deleteUser, { loading: deleteLoading }] = useMutation(DELETE_USER_MUTATION);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleDelete = async () => {
    if (!selectedUser) {
      message.warning("Please select a user to delete");
      return;
    }

    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      icon: <ExclamationCircleOutlined />,
      content: `This will permanently delete user "${selectedUser.username}" and cannot be undone.`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteUser({
            variables: {
              id: selectedUser.id,
            },
          });
          
          message.success(`User "${selectedUser.username}" deleted successfully!`);
          setIsModalVisible(false);
          setSelectedUser(null);
        } catch (error) {
          message.error(`Failed to delete user: ${error.message}`);
        }
      },
    });
  };

  const users = usersData?.users || [];

  return (
    <>
      <Button
        type={type}
        danger={danger}
        icon={<DeleteOutlined />}
        onClick={showModal}
        size={size}
      >
        Delete User
      </Button>

      <Modal
        title="Delete User"
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
            disabled={!selectedUser}
          >
            Delete User
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <div style={{ marginBottom: 16 }}>
            <strong>Select user to delete:</strong>
          </div>
          
          <Select
            style={{ width: "100%" }}
            placeholder="Choose a user to delete"
            loading={usersLoading}
            value={selectedUser?.id}
            onChange={(userId) => {
              const user = users.find(u => u.id === userId);
              setSelectedUser(user);
            }}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {users.map((user) => (
              <Select.Option key={user.id} value={user.id}>
                {user.username} ({user.email})
              </Select.Option>
            ))}
          </Select>

          {selectedUser && (
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
                      icon={<UserOutlined />} 
                      style={{ backgroundColor: "#ff4d4f" }}
                    />
                  }
                  title={<span style={{ color: "#cf1322" }}>{selectedUser.username}</span>}
                  description={selectedUser.email}
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
            ⚠️ <strong>Warning:</strong> This action cannot be undone. The user and all associated data will be permanently removed.
          </div>
        </Space>
      </Modal>
    </>
  );
};

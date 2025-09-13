import React, { useState } from "react";
import { Button, Modal, List, Avatar, message, Select, Space } from "antd";
import { DeleteOutlined, CalendarOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery, gql } from "@apollo/client";

const DELETE_EVENT_MUTATION = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
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

const GET_EVENTS_FOR_DELETE = gql`
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

export const DeleteEventButton = ({ type = "primary", size = "middle", danger = true }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { data: eventsData, loading: eventsLoading } = useQuery(GET_EVENTS_FOR_DELETE);
  const [deleteEvent, { loading: deleteLoading }] = useMutation(DELETE_EVENT_MUTATION);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedEvent(null);
  };

  const handleDelete = async () => {
    if (!selectedEvent) {
      message.warning("Please select an event to delete");
      return;
    }

    Modal.confirm({
      title: "Are you sure you want to delete this event?",
      icon: <ExclamationCircleOutlined />,
      content: `This will permanently delete event "${selectedEvent.title}" and cannot be undone.`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteEvent({
            variables: {
              id: selectedEvent.id,
            },
          });
          
          message.success(`Event "${selectedEvent.title}" deleted successfully!`);
          setIsModalVisible(false);
          setSelectedEvent(null);
        } catch (error) {
          message.error(`Failed to delete event: ${error.message}`);
        }
      },
    });
  };

  const events = eventsData?.events || [];

  return (
    <>
      <Button
        type={type}
        danger={danger}
        icon={<DeleteOutlined />}
        onClick={showModal}
        size={size}
      >
        Delete Event
      </Button>

      <Modal
        title="Delete Event"
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
            disabled={!selectedEvent}
          >
            Delete Event
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <div style={{ marginBottom: 16 }}>
            <strong>Select event to delete:</strong>
          </div>
          
          <Select
            style={{ width: "100%" }}
            placeholder="Choose an event to delete"
            loading={eventsLoading}
            value={selectedEvent?.id}
            onChange={(eventId) => {
              const event = events.find(e => e.id === eventId);
              setSelectedEvent(event);
            }}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {events.map((event) => (
              <Select.Option key={event.id} value={event.id}>
                {event.title} - {event.date}
              </Select.Option>
            ))}
          </Select>

          {selectedEvent && (
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
                      icon={<CalendarOutlined />} 
                      style={{ backgroundColor: "#ff4d4f" }}
                    />
                  }
                  title={<span style={{ color: "#cf1322" }}>{selectedEvent.title}</span>}
                  description={
                    <Space direction="vertical" size="xs">
                      <span>{selectedEvent.desc}</span>
                      <span>{selectedEvent.date} • {selectedEvent.from} - {selectedEvent.to}</span>
                      <span>By: {selectedEvent.user?.username || 'Unknown'}</span>
                      <span>Location: {selectedEvent.location?.name || 'TBD'}</span>
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
            ⚠️ <strong>Warning:</strong> This action cannot be undone. The event and all associated data will be permanently removed.
          </div>
        </Space>
      </Modal>
    </>
  );
};

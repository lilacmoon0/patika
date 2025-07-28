import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker, TimePicker, Select, message } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useMutation, useQuery, gql } from "@apollo/client";
import dayjs from 'dayjs';

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($inputData: EventInput!) {
    createNewEvent(inputData: $inputData) {
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

const GET_USERS_AND_LOCATIONS = gql`
  query GetUsersAndLocations {
    users {
      id
      username
    }
    locations {
      id
      name
    }
  }
`;

export const CreateEventButton = ({ type = "primary", size = "middle" }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [createEvent, { loading }] = useMutation(CREATE_EVENT_MUTATION);
  const { data: usersAndLocations } = useQuery(GET_USERS_AND_LOCATIONS);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      await createEvent({
        variables: {
          inputData: {
            title: values.title,
            desc: values.desc,
            date: values.date.format('YYYY-MM-DD'),
            from: values.from.format('HH:mm'),
            to: values.to.format('HH:mm'),
            location_id: values.location_id,
            user_id: values.user_id,
          },
        },
      });
      
      message.success(`Event "${values.title}" created successfully!`);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error(`Failed to create event: ${error.message}`);
    }
  };

  const users = usersAndLocations?.users || [];
  const locations = usersAndLocations?.locations || [];

  return (
    <>
      <Button
        type={type}
        icon={<CalendarOutlined />}
        onClick={showModal}
        size={size}
      >
        Create Event
      </Button>

      <Modal
        title="Create New Event"
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
            Create Event
          </Button>,
        ]}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item
            name="title"
            label="Event Title"
            rules={[
              { required: true, message: "Please enter event title" },
              { min: 3, message: "Title must be at least 3 characters" },
            ]}
          >
            <Input placeholder="Enter event title" />
          </Form.Item>

          <Form.Item
            name="desc"
            label="Description"
            rules={[
              { required: true, message: "Please enter event description" },
            ]}
          >
            <Input.TextArea 
              rows={3} 
              placeholder="Enter event description" 
            />
          </Form.Item>

          <Form.Item
            name="date"
            label="Event Date"
            rules={[
              { required: true, message: "Please select event date" },
            ]}
          >
            <DatePicker 
              style={{ width: '100%' }}
              placeholder="Select date"
              disabledDate={(current) => current && current < dayjs().startOf('day')}
            />
          </Form.Item>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item
              name="from"
              label="Start Time"
              style={{ flex: 1 }}
              rules={[
                { required: true, message: "Please select start time" },
              ]}
            >
              <TimePicker 
                style={{ width: '100%' }}
                format="HH:mm"
                placeholder="Start time"
              />
            </Form.Item>

            <Form.Item
              name="to"
              label="End Time"
              style={{ flex: 1 }}
              rules={[
                { required: true, message: "Please select end time" },
              ]}
            >
              <TimePicker 
                style={{ width: '100%' }}
                format="HH:mm"
                placeholder="End time"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="user_id"
            label="Organizer"
            rules={[
              { required: true, message: "Please select an organizer" },
            ]}
          >
            <Select placeholder="Select organizer">
              {users.map(user => (
                <Select.Option key={user.id} value={user.id}>
                  @{user.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="location_id"
            label="Location"
            rules={[
              { required: true, message: "Please select a location" },
            ]}
          >
            <Select placeholder="Select location">
              {locations.map(location => (
                <Select.Option key={location.id} value={location.id}>
                  {location.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

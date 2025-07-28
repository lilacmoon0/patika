import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import {
  Card,
  Radio,
  Button,
  Progress,
  Typography,
  Space,
  Divider,
  Form,
  Input,
  Modal,
  notification,
} from "antd";
import {
  PlusOutlined,
  BarChartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  GET_QUESTIONS,
  VOTE_OPTION,
  CREATE_QUESTION,
  CREATE_OPTION,
  DELETE_QUESTION,
  OPTION_VOTED_SUBSCRIPTION,
} from "./queries";

const { Title, Text } = Typography;
const { TextArea } = Input;

export const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [votedQuestions, setVotedQuestions] = useState(new Set());
  const [form] = Form.useForm();

  // Query to get all questions
  const { data, loading, error, refetch } = useQuery(GET_QUESTIONS);

  // Mutations
  const [voteOption] = useMutation(VOTE_OPTION);
  const [createQuestion] = useMutation(CREATE_QUESTION);
  const [createOption] = useMutation(CREATE_OPTION);
  const [deleteQuestion] = useMutation(DELETE_QUESTION);

  // Subscriptions
  // useSubscription(QUESTION_CREATED_SUBSCRIPTION, {
  //   onSubscriptionData: ({ subscriptionData }) => {
  //     if (subscriptionData.data) {
  //       const newQuestion = subscriptionData.data.questionCreated;
  //       setQuestions((prev) => [newQuestion, ...prev]); // Add to top
  //       notification.success({
  //         message: "New Question Added!",
  //         description: `"${newQuestion.question}" has been added to the poll.`,
  //         placement: "topRight",
  //       });
  //     }
  //   },
  // });

  useSubscription(OPTION_VOTED_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data) {
        const votedOption = subscriptionData.data.optionVoted;
        setQuestions((prev) =>
          prev.map((question) => {
            if (question.id === votedOption.questionId) {
              return {
                ...question,
                voteCount: question.voteCount + 1,
                options: question.options.map((option) =>
                  option.id === votedOption.id
                    ? { ...option, votes: votedOption.votes }
                    : option
                ),
              };
            }
            return question;
          })
        );
      }
    },
  });

  // Update questions when data loads
  useEffect(() => {
    if (data && data.questions) {
      setQuestions(data.questions);
    }
  }, [data]);

  const handleVote = async (questionId, optionId) => {
    // Check if user has already voted on this question
    if (votedQuestions.has(questionId)) {
      notification.warning({
        message: "Already Voted",
        description: "You have already voted on this question.",
        placement: "topRight",
      });
      return;
    }

    try {
      await voteOption({
        variables: {
          questionId: parseInt(questionId),
          optionId: parseInt(optionId),
        },
      });

      // Mark this question as voted
      setVotedQuestions((prev) => new Set([...prev, questionId]));

      notification.success({
        message: "Vote Submitted!",
        description: "Your vote has been recorded successfully.",
        placement: "topRight",
      });
    } catch (error) {
      notification.error({
        message: "Vote Failed",
        description:
          "There was an error submitting your vote. Please try again.",
      });
    }
  };

  const handleCreateQuestion = async (values) => {
    try {
      const { data: questionData } = await createQuestion({
        variables: { question: values.question },
      });

      const questionId = questionData.createQuestion.id;

      // Create options for the question
      const optionPromises = values.options
        .filter((optionText) => optionText && optionText.trim())
        .map((optionText) =>
          createOption({
            variables: {
              questionId: parseInt(questionId),
              text: optionText.trim(),
            },
          })
        );

      await Promise.all(optionPromises);

      // Refetch questions to get the complete question with all options
      await refetch();

      form.resetFields();
      setIsModalVisible(false);

      notification.success({
        message: "Question Created!",
        description: "Your new poll question has been created successfully.",
      });
    } catch (error) {
      console.error("Error creating question:", error);
      notification.error({
        message: "Creation Failed",
        description:
          "There was an error creating your question. Please try again.",
      });
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    console.log("Delete button clicked for question:", questionId);
    try {
      const result = await deleteQuestion({
        variables: { questionId: parseInt(questionId) },
      });
      console.log("Delete result:", result);

      // Remove the question from local state
      setQuestions((prev) => prev.filter((q) => q.id !== questionId));

      // Also remove from voted questions if it was voted on
      setVotedQuestions((prev) => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });

      notification.success({
        message: "Question Deleted!",
        description: "The question has been successfully deleted.",
        placement: "topRight",
      });
    } catch (error) {
      console.error("Error deleting question:", error);
      notification.error({
        message: "Deletion Failed",
        description:
          "There was an error deleting the question. Please try again.",
      });
    }
  };

  const getVotePercentage = (optionVotes, totalVotes) => {
    return totalVotes > 0 ? Math.round((optionVotes / totalVotes) * 100) : 0;
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Loading questions...
      </div>
    );
  if (error)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Error: {error.message}
      </div>
    );

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <Title level={1}>
          <BarChartOutlined /> Poll Questions
        </Title>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Create New Question
        </Button>
      </div>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {questions.map((question) => (
          <Card
            key={question.id}
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Text strong style={{ fontSize: "16px" }}>
                    {question.question}
                  </Text>
                  {votedQuestions.has(question.id) && (
                    <Text
                      type="success"
                      style={{ fontSize: "12px", fontWeight: "bold" }}
                    >
                      ✓ Voted
                    </Text>
                  )}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Text type="secondary">{question.voteCount} votes</Text>
                  <Button
                    type="text"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteQuestion(question.id);
                    }}
                    title="Delete Question"
                  />
                </div>
              </div>
            }
            bordered
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Radio.Group
              style={{ width: "100%" }}
              onChange={(e) => handleVote(question.id, e.target.value)}
            >
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="middle"
              >
                {question.options.map((option) => {
                  const percentage = getVotePercentage(
                    option.votes,
                    question.voteCount
                  );
                  return (
                    <div key={option.id} style={{ width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "5px",
                        }}
                      >
                        <Radio
                          value={option.id}
                          style={{
                            fontWeight: "500",
                            ...(votedQuestions.has(question.id) && {
                              color: "rgba(0, 0, 0, 0.88)", // Keep text fully opaque
                            }),
                          }}
                          disabled={votedQuestions.has(question.id)}
                        >
                          <span style={{ color: "rgba(0, 0, 0, 0.88)" }}>
                            {option.text}
                          </span>
                        </Radio>
                        <Text type="secondary">
                          {option.votes} votes ({percentage}%)
                        </Text>
                      </div>
                      <Progress
                        percent={percentage}
                        showInfo={false}
                        strokeColor={{
                          "0%": "#87d068",
                          "100%": "#108ee9",
                        }}
                        style={{ marginBottom: "10px" }}
                      />
                    </div>
                  );
                })}
              </Space>
            </Radio.Group>
          </Card>
        ))}
      </Space>

      <Modal
        title="Create New Poll Question"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateQuestion}
          initialValues={{
            options: ["", ""], // Start with 2 empty options
          }}
        >
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: "Please enter your question!" }]}
          >
            <TextArea
              rows={3}
              placeholder="Enter your poll question here..."
              maxLength={200}
              showCount
            />
          </Form.Item>

          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                <label
                  style={{
                    fontWeight: "500",
                    marginBottom: "10px",
                    display: "block",
                  }}
                >
                  Options (minimum 2 required)
                </label>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{ display: "flex", marginBottom: "10px" }}
                  >
                    <Form.Item
                      {...restField}
                      name={name}
                      style={{ flex: 1, marginRight: "10px", marginBottom: 0 }}
                      rules={[
                        { required: true, message: "Please enter an option!" },
                      ]}
                    >
                      <Input placeholder={`Option ${name + 1}`} />
                    </Form.Item>
                    {fields.length > 2 && (
                      <Button
                        type="text"
                        danger
                        onClick={() => remove(name)}
                        style={{ height: "32px" }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    style={{ width: "100%" }}
                  >
                    Add Option
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Divider />

          <Form.Item style={{ marginBottom: 0 }}>
            <Space>
              <Button type="primary" htmlType="submit" size="large">
                Create Question
              </Button>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                }}
                size="large"
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

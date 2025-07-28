import { gql } from "@apollo/client";

// Query to get all questions
export const GET_QUESTIONS = gql`
  query GetQuestions {
    questions {
      id
      question
      voteCount
      options {
        id
        text
        votes
        questionId
      }
    }
  }
`;

// Mutation to vote for an option
export const VOTE_OPTION = gql`
  mutation VoteOption($questionId: Int!, $optionId: Int!) {
    voteOption(questionId: $questionId, optionId: $optionId) {
      id
      text
      votes
      questionId
    }
  }
`;

// Mutation to create a new question
export const CREATE_QUESTION = gql`
  mutation CreateQuestion($question: String!) {
    createQuestion(question: $question) {
      id
      question
      voteCount
      options {
        id
        text
        votes
        questionId
      }
    }
  }
`;

// Mutation to create an option for a question
export const CREATE_OPTION = gql`
  mutation CreateOption($questionId: Int!, $text: String!) {
    createOption(questionId: $questionId, text: $text) {
      id
      text
      votes
      questionId
    }
  }
`;

// Subscription for new questions
export const QUESTION_CREATED_SUBSCRIPTION = gql`
  subscription QuestionCreated {
    questionCreated {
      id
      question
      voteCount
      options {
        id
        text
        votes
        questionId
      }
    }
  }
`;

// Subscription for vote updates
export const OPTION_VOTED_SUBSCRIPTION = gql`
  subscription OptionVoted {
    optionVoted {
      id
      text
      votes
      questionId
    }
  }
`;

// Mutation to delete a question
export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($questionId: Int!) {
    deleteQuestion(questionId: $questionId)
  }
`;

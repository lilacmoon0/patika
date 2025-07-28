import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($username: String!) {
    createUser(username: $username) {
      id
      username
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($input: MessageInput!) {
    createMessage(input: $input) {
      id
      text
      userId
    }
  }
`;

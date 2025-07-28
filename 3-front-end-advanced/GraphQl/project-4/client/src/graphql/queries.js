import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      messages {
        id
        text
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      text
      userId
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      username
      messages {
        id
        text
      }
    }
  }
`;

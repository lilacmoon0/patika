import { gql } from "@apollo/client";

export const USER_ADDED = gql`
  subscription UserAdded {
    userAdded {
      id
      username
    }
  }
`;

export const MESSAGE_ADDED = gql`
  subscription MessageAdded {
    messageAdded {
      id
      text
      userId
    }
  }
`;

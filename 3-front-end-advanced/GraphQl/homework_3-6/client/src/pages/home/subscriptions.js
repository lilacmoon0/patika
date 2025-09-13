import { gql } from "@apollo/client";

export const USER_ADDED_SUBSCRIPTION = gql`
  subscription UserAdded {
    userAdded {
      id
      username
      email
    }
  }
`;

export const EVENT_ADDED_SUBSCRIPTION = gql`
  subscription EventAdded {
    eventAdded {
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

export const LOCATION_ADDED_SUBSCRIPTION = gql`
  subscription LocationAdded {
    locationAdded {
      id
      name
      desc
      lat
      lng
    }
  }
`;

export const USER_DELETED_SUBSCRIPTION = gql`
  subscription UserDeleted {
    userDeleted {
      id
      username
      email
    }
  }
`;

export const EVENT_DELETED_SUBSCRIPTION = gql`
  subscription EventDeleted {
    eventDeleted {
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

export const LOCATION_DELETED_SUBSCRIPTION = gql`
  subscription LocationDeleted {
    locationDeleted {
      id
      name
      desc
      lat
      lng
    }
  }
`;

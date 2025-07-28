const { ApolloServer, gql } = require("apollo-server");
const data = require("./data.json");

const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
    user: User!
    location: Location!
    participants: [Participant]
  }

  input EventInput {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    events: [Event]
  }

  input UserInput {
    username: String!
    email: String!
  }

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input LocationInput {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
    user: User!
    event: Event!
  }

  input ParticipantInput {
    user_id: ID!
    event_id: ID!
  }

  type Query {
    events: [Event]
    event(id: ID!): Event
    users: [User]
    user(id: ID!): User
    locations: [Location]
    location(id: ID!): Location
    participants: [Participant]
    participant(id: ID!): Participant
  }

  type Mutation {
    addNewLocation(inputData: LocationInput!): Location
    createNewEvent(inputData: EventInput!): Event
    createNewUser(inputData: UserInput!): User
    assignParticipant(inputData: ParticipantInput!): Participant
    updateUser(id: ID!, inputData: UserInput!): User
    updateEvent(id: ID!, inputData: EventInput!): Event
    updateLocation(id: ID!, inputData: LocationInput!): Location
    deleteAllUsers: Int
    deleteAllLocations: Int
    deleteAllEvents: Int
    deleteAllParticipants: Int
    deleteAllData: String
    deleteUser(id: ID!): User
    deleteEvent(id: ID!): Event
    deleteLocation(id: ID!): Location
    deleteParticipant(id: ID!): Participant

  }
`;

const resolvers = {
  Query: {
    events: () => data.events,
    event: (parent, args) => {
      const result = data.events.find((event) => event.id == args.id);
      return result;
    },
    users: () => data.users,
    user: (parent, args) => {
      const result = data.users.find((user) => user.id == args.id);
      return result;
    },
    locations: () => data.locations,
    location: (parent, args) => {
      const result = data.locations.find((location) => location.id == args.id);
      return result;
    },
    participants: () => data.participants,
    participant: (parent, args) => {
      const result = data.participants.find(
        (participant) => participant.id == args.id
      );

      return result;
    },
  },

  Event: {
    user: (parent) => {
      return data.users.find((user) => user.id == parent.user_id);
    },

    location: (parent) =>
      data.locations.find((location) => location.id == parent.location_id),
    participants: (parent) =>
      data.participants.filter(
        (participant) => participant.event_id == parent.id
      ),
  },

  User: {
    events: (parent) =>
      data.events.filter((event) => event.user_id == parent.id),
  },

  Participant: {
    user: (parent) => data.users.find((user) => user.id == parent.user_id),
    event: (parent) => data.events.find((event) => event.id == parent.event_id),
  },

  Mutation: {
    // user
    createNewUser: (parent, { inputData }) => {
      const newUser = {
        id: data.users.length + 1,
        ...inputData,
      };
      data.users.push(newUser);
      return newUser;
    },

    updateUser: (parent, { id, inputData }) => {
      const userIndex = data.users.findIndex((user) => user.id == id);
      if (userIndex === -1) {
        throw new Error("User not found");
      }

      const updatedUser = {
        ...data.users[userIndex],
        ...inputData,
      };  
      data.users[userIndex] = updatedUser;
      return updatedUser;
    },
     deleteAllUsers: () => {
      const count = data.users.length;
      data.users.splice(0, count);
      return count;
    },

    deleteUser: (parent, { id }) => {
      const userIndex = data.users.findIndex((user) => user.id == id);
      if (userIndex === -1) {
        throw new Error("User not found");
      }
      const deletedUser = data.users[userIndex];
      data.users.splice(userIndex, 1);
      return deletedUser;
    },
    // location
    addNewLocation: (parent, { inputData }) => {
      const newLocation = {
        id: data.locations.length + 1,
        ...inputData,
      };
      data.locations.push(newLocation);
      return newLocation;
    },
    deleteLocation: (parent, { id }) => {
      const locationIndex = data.locations.findIndex((location) => location.id == id);
      if (locationIndex === -1) {
        throw new Error("Location not found");
      }
      const deletedLocation = data.locations[locationIndex];
      data.locations.splice(locationIndex, 1);
      return deletedLocation;
    },
    updateLocation: (parent, { id, inputData }) => {
      const locationIndex = data.locations.findIndex((location) => location.id == id);
      if (locationIndex === -1) {
        throw new Error("Location not found");
      }
      const updatedLocation = {
        ...data.locations[locationIndex],
        ...inputData,
      };  
      data.locations[locationIndex] = updatedLocation;
      return updatedLocation;
    },
    deleteAllLocations: () => {
      const count = data.locations.length;
      data.locations.splice(0, count);
      return count;
    },
    // event
    createNewEvent: (parent, { inputData }) => {
      const newEvent = {
        id: data.events.length + 1,
        ...inputData,
      };
      data.events.push(newEvent);
      return newEvent;
    },
    deleteEvent: (parent, { id }) => {
      const eventIndex = data.events.findIndex((event) => event.id == id);
      if (eventIndex === -1) {
        throw new Error("Event not found");
      }
      const deletedEvent = data.events[eventIndex];
      data.events.splice(eventIndex, 1);
      return deletedEvent;
    },
    updateEvent: (parent, { id, inputData }) => {
      const eventIndex = data.events.findIndex((event) => event.id == id);
      if (eventIndex === -1) {
        throw new Error("Event not found");
      }
      const updatedEvent = {
        ...data.events[eventIndex],
        ...inputData,
      };  
      data.events[eventIndex] = updatedEvent;
      return updatedEvent;
    },
    deleteAllEvents: () => {
      const count = data.events.length;
      data.events.splice(0, count);
      return count;
    },
    // participant
    assignParticipant: (parent, { inputData }) => {
      const userExists = data.users.some(
        (user) => user.id == inputData.user_id
      );
      const eventExists = data.events.some(
        (event) => event.id == inputData.event_id
      );
      if (!userExists || !eventExists) {
        throw new Error("User or Event does not exist");
      } else if (
        data.participants.some(
          (participant) => participant.user_id == inputData.user_id
        )
      ) {
        const userindex = data.participants.findIndex(
          (participant) => participant.user_id == inputData.user_id
        );

        const updatedParticipant = {
          ...data.participants[userindex],
          event_id: inputData.event_id,
        };

        data.participants[userindex] = updatedParticipant;
        return updatedParticipant;
      } else if (
        data.participants.some(
          (participant) => participant.event_id == inputData.event_id
        )
      ) {
        throw new Error("User is already assigned to this event");
      } else {
        const newParticipant = {
          id: data.participants.length + 1,
          ...inputData,
        };
        data.participants.push(newParticipant);
        return newParticipant;
      }
    },
    deleteParticipant: (parent, { id }) => {
      const participantIndex = data.participants.findIndex(
        (participant) => participant.id == id
      );
      if (participantIndex === -1) {
        throw new Error("Participant not found");
      }
      const deletedParticipant = data.participants[participantIndex];
      data.participants.splice(participantIndex, 1);
      return deletedParticipant;
    },
    deleteAllParticipants: () => {
      const count = data.participants.length;
      data.participants.splice(0, count);
      return count;
    },

    deleteAllData: () => {
      const userCount = data.users.length;
      const eventCount = data.events.length;
      const locationCount = data.locations.length;
      const participantCount = data.participants.length;
      
      data.users.splice(0, userCount);
      data.events.splice(0, eventCount);
      data.locations.splice(0, locationCount);
      data.participants.splice(0, participantCount);
      
      return `Deleted ${userCount + eventCount + locationCount + participantCount} records`;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

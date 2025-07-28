import { data, saveData } from "../data.js";
import { pubsub } from "../pubsub.js";

export const Mutation = {
  // user
  createNewUser: (parent, { inputData }) => {
    const newUser = {
      id: data.users.length + 1,
      ...inputData,
    };
    data.users.push(newUser);

    // Publish subscription event
    pubsub.publish("USER_ADDED", { userAdded: newUser });

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
    pubsub.publish("USER_UPDATED", { userUpdated: updatedUser });

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
    pubsub.publish("USER_DELETED", { userDeleted: deletedUser });
    return deletedUser;
  },
  // location
  addNewLocation: (parent, { inputData }) => {
    const newLocation = {
      id: data.locations.length + 1,
      ...inputData,
    };
    data.locations.push(newLocation);

    // Publish subscription event
    pubsub.publish("LOCATION_ADDED", { locationAdded: newLocation });

    return newLocation;
  },
  deleteLocation: (parent, { id }) => {
    const locationIndex = data.locations.findIndex(
      (location) => location.id == id
    );
    if (locationIndex === -1) {
      throw new Error("Location not found");
    }
    const deletedLocation = data.locations[locationIndex];
    data.locations.splice(locationIndex, 1);
    pubsub.publish("LOCATION_DELETED", { locationDeleted: deletedLocation });
    return deletedLocation;
  },
  updateLocation: (parent, { id, inputData }) => {
    const locationIndex = data.locations.findIndex(
      (location) => location.id == id
    );
    if (locationIndex === -1) {
      throw new Error("Location not found");
    }
    const updatedLocation = {
      ...data.locations[locationIndex],
      ...inputData,
    };
    data.locations[locationIndex] = updatedLocation;
    pubsub.publish("LOCATION_UPDATED", { locationUpdated: updatedLocation });
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

    // Publish subscription event
    pubsub.publish("EVENT_ADDED", { eventAdded: newEvent });

    return newEvent;
  },
  deleteEvent: (parent, { id }) => {
    const eventIndex = data.events.findIndex((event) => event.id == id);
    if (eventIndex === -1) {
      throw new Error("Event not found");
    }
    const deletedEvent = data.events[eventIndex];
    data.events.splice(eventIndex, 1);
    pubsub.publish("EVENT_DELETED", { eventDeleted: deletedEvent });
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
    pubsub.publish("EVENT_UPDATED", { eventUpdated: updatedEvent });
    return updatedEvent;
  },
  deleteAllEvents: () => {
    const count = data.events.length;
    data.events.splice(0, count);
    return count;
  },
  // participant
  assignParticipant: (parent, { inputData }) => {
    const userExists = data.users.some((user) => user.id == inputData.user_id);
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

      // Publish subscription event
      pubsub.publish("PARTICIPANT_ADDED", {
        participantAdded: updatedParticipant,
      });

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

      // Publish subscription event
      pubsub.publish("PARTICIPANT_ADDED", { participantAdded: newParticipant });

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
    pubsub.publish("PARTICIPANT_DELETED", {
      participantDeleted: deletedParticipant,
    });
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

    return `Deleted ${
      userCount + eventCount + locationCount + participantCount
    } records`;
  },
};

export default Mutation;

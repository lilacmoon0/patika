import { data } from "../data.js";

export const Subscription = {
  userAdded: {
    subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator("USER_ADDED"),
  },
  userUpdated: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator("USER_UPDATED"),
  },
  userDeleted: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator("USER_DELETED"),
  },
  locationAdded: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator("LOCATION_ADDED"),
  },
  locationUpdated: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator("LOCATION_UPDATED"),
  },
  locationDeleted: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator("LOCATION_DELETED"),
  },
  eventAdded: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator("EVENT_ADDED"),
  },
  eventUpdated: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator("EVENT_UPDATED"),
  },
  eventDeleted: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator("EVENT_DELETED"),
  },
  participantAdded: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator("PARTICIPANT_ADDED"),
  },
  participantDeleted: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator("PARTICIPANT_DELETED"),
  },
};

export default Subscription;

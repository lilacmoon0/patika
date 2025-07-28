export const Subscription = {
  userAdded: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("userAdded"),
  },
  messageAdded: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("messageAdded"),
  },
};

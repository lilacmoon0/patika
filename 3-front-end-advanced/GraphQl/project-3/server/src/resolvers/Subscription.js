import { data } from "../data.js";

export const Subscription = {
  questionCreated: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator("QUESTION_CREATED"),
  },
  optionVoted: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator("OPTION_VOTED"),
  },
};

export default Subscription;

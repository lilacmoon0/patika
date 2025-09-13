import { data } from "../data.js";

export const Query = {
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
};

export default Query;
